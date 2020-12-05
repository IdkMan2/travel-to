import buildConfiguration from '@server/configuration/common';
import {BadRequestException} from '@server/exceptions/BadRequestException';
import {NotFoundException} from '@server/exceptions/NotFoundException';
import IImageCollection from '@server/interfaces/collections/IImageCollection';
import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import NextAuthorizedApiRequest from '@server/interfaces/NextAuthorizedApiRequest';
import IImageResource from '@server/interfaces/resources/IImageResource';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import {getMongoDb} from '@server/mechanisms/database';
import {ObjectId} from 'bson';
import {Db} from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {NextConnect} from 'next-connect';

const handler: NextConnect<NextApiRequest, NextApiResponse> = buildConfiguration({auth: true}).get(async function (
  req: NextAuthorizedApiRequest,
  res: NextApiResponse
) {
  if (typeof req.query.id !== 'string') throw new BadRequestException(1, 'Missing `id` field in query parameters.');

  const mongoDb: Db = await getMongoDb();
  const journeysCollection = mongoDb.collection<IJourneyCollection[number]>('journeys');
  const journey = await journeysCollection.findOne({userId: req.auth.user.id, _id: new ObjectId(req.query.id)});

  if (!journey) throw new NotFoundException(1, `Not found journey with id '${req.query.id}'.`);

  const imagesCollection = mongoDb.collection<IImageCollection[number]>('images');
  const imagesCursor = await imagesCollection.find({journeyId: journey._id});
  const images = (await imagesCursor.toArray()).map((img: Partial<IImageCollection[number]>) => {
    delete img.journeyId;
    return img;
  }) as IImageResource[];

  res.status(200).json({
    ...journey,
    _id: journey._id.toHexString(),
    userId: journey.userId.toHexString(),
    images,
  } as IJourneyResource);
});

export default handler;
