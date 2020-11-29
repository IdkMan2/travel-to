import {BadRequestException} from '@server/exceptions/BadRequestException';
import IImageCollection from '@server/interfaces/collections/IImageCollection';
import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import NextAuthorizedApiRequest from '@server/interfaces/NextAuthorizedApiRequest';
import IImageResource from '@server/interfaces/resources/IImageResource';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import CloudinaryUploader from '@server/mechanisms/CloudinaryUploader';
import {getMongoDb} from '@server/mechanisms/database';
import Journey from '@server/models/Journey';
import {UploadApiResponse} from 'cloudinary';
import {Fields, File, Files, IncomingForm} from 'formidable';
import {Db} from 'mongodb';
import {NextApiResponse} from 'next';
import {number, object, ObjectSchema, string, ValidationError} from 'yup';

const ALLOWED_IMG_UPLOAD_COUNT: number = 5;
const ALLOWED_MIME_TYPES: string[] = ['image/bmp', 'image/png', 'image/jpeg', 'image/x-xbitmap'];
const journeyValidationSchema: ObjectSchema<Omit<IJourneyResource, 'id' | 'images'>> = object().required().shape({
  startDate: number().required().positive().integer(),
  endDate: number().required().positive().integer(),
  startPoint: string().required(),
  endPoint: string().required(),
  kilometersTraveled: number().required().positive().integer(),
});

export default async function handler(req: NextAuthorizedApiRequest, res: NextApiResponse) {
  const form = new IncomingForm();
  const {fields, files} = await new Promise<{fields: Fields; files: Files}>((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({fields, files});
    });
  });

  // Check upload limit
  const filesKeys: string[] = Object.keys(files);
  if (filesKeys.length > ALLOWED_IMG_UPLOAD_COUNT)
    throw new BadRequestException(1, "You can't upload more than 5 files.");

  // Validate MIME type of files
  for (const fileKey of filesKeys) {
    if (ALLOWED_MIME_TYPES.indexOf(files[fileKey].type) === -1)
      throw new BadRequestException(
        2,
        `Received file '${fileKey}' with invalid mime type. Allowed mime types: [${ALLOWED_MIME_TYPES.join(', ')}]`
      );
  }

  // Validate form fields
  let validatedFields;
  try {
    validatedFields = await journeyValidationSchema.cast(fields, {
      strict: true,
      stripUnknown: true,
      abortEarly: true,
    });
  } catch (e: unknown) {
    throw new BadRequestException(
      3,
      `Invalid form fields provided (${e instanceof ValidationError ? e.message : 'unknown validation error'}).`
    );
  }

  const db: Db = await getMongoDb();
  const journeysCollection = await db.collection<IJourneyCollection[number]>('journeys');
  const results = await journeysCollection.insertOne(validatedFields);
  const journey = new Journey(results.ops[0]);

  for (const fileKey of filesKeys) {
    const file: File = files[fileKey];
    const uploadResult: UploadApiResponse = await CloudinaryUploader.uploadImage(file);
    const imagesCollection = await db.collection<IImageCollection[number]>('images');
    const results = await imagesCollection.insertOne({
      journeyId: journey.id,
      _id: uploadResult.asset_id,
      publicId: uploadResult.public_id,
      url: uploadResult.secure_url,
    });
    const {_id, publicId, url}: IImageResource = results.ops[0];
    journey.images.push({_id, publicId, url});
  }

  res.status(200).json(journey.serialize());
}
