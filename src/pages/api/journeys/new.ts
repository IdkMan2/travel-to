import buildConfiguration from '@server/configuration/common';
import {BadRequestException} from '@server/exceptions/BadRequestException';
import IImageCollection from '@server/interfaces/collections/IImageCollection';
import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import NextAuthorizedApiRequest from '@server/interfaces/NextAuthorizedApiRequest';
import IImageResource from '@server/interfaces/resources/IImageResource';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import CloudinaryUploader from '@server/mechanisms/CloudinaryUploader';
import {getMongoDb} from '@server/mechanisms/database';
import Journey from '@server/models/Journey';
import {ObjectId} from 'bson';
import {UploadApiResponse} from 'cloudinary';
import {Fields, File, Files, IncomingForm} from 'formidable';
import {Db} from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {NextConnect} from 'next-connect';
import {number, object, ObjectSchema, string, ValidationError} from 'yup';

type MultipleFiles = Record<keyof Files, File[]>;

const ALLOWED_IMG_UPLOAD_COUNT: number = 6;
const ALLOWED_MIME_TYPES: string[] = ['image/bmp', 'image/png', 'image/jpeg', 'image/x-xbitmap'];
const journeyValidationSchema: ObjectSchema<Omit<IJourneyResource, '_id' | 'images'>> = object().required().shape({
  userId: string().required(),
  startDate: number().required().positive().integer(),
  endDate: number().required().positive().integer(),
  startPoint: string().required(),
  endPoint: string().required(),
  kilometersTraveled: number().required().positive().integer(),
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextConnect<NextApiRequest, NextApiResponse> = buildConfiguration({auth: true}).post(async function (
  req: NextAuthorizedApiRequest,
  res: NextApiResponse
) {
  const form = new IncomingForm({});
  form.multiples = true;
  const {fields, files} = await new Promise<{fields: Fields; files: MultipleFiles}>((resolve, reject) => {
    form.parse(req, (err, fields, files: Record<keyof Files, File | File[]>) => {
      if (err) reject(err);

      const filesKeys = Object.keys(files);
      for (const key of filesKeys) {
        files[key] = (Array.isArray(files[key]) ? files[key] : [files[key]]) as File[];
      }

      resolve({fields, files: files as MultipleFiles});
    });
  });

  // Check upload limit
  const filesKeys: string[] = Object.keys(files);
  if (filesKeys.length > ALLOWED_IMG_UPLOAD_COUNT)
    throw new BadRequestException(1, "You can't upload more than 5 files.");

  // Validate MIME type of files
  for (const fileKey of filesKeys) {
    for (const file of files[fileKey] as File[]) {
      if (ALLOWED_MIME_TYPES.indexOf(file.type) === -1)
        throw new BadRequestException(
          2,
          `Received file '${fileKey}' with invalid mime type. Allowed mime types: [${ALLOWED_MIME_TYPES.join(', ')}]`
        );
    }
  }

  // Validate form fields
  let validatedFields: Omit<IJourneyResource, 'images' | '_id'>;
  try {
    validatedFields = await journeyValidationSchema.cast(
      {...fields, userId: req.auth.user.id.toHexString()},
      {
        strict: true,
        stripUnknown: true,
        abortEarly: true,
      }
    );
  } catch (e: unknown) {
    console.error(e);
    throw new BadRequestException(
      3,
      `Invalid form fields provided (${e instanceof ValidationError ? e.message : 'unknown validation error'}).`
    );
  }

  const db: Db = await getMongoDb();
  const journeysCollection = db.collection<IJourneyCollection[number]>('journeys');
  const results = await journeysCollection.insertOne({
    ...validatedFields,
    userId: new ObjectId(validatedFields.userId),
  });
  const journey = new Journey(results.ops[0]);

  for (const fileKey of filesKeys) {
    for (const file of files[fileKey]) {
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
  }

  res.status(200).json(journey.serialize());
});

export default handler;
