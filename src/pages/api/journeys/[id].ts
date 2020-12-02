import buildConfiguration from '@server/configuration/common';
import {BadRequestException} from '@server/exceptions/BadRequestException';
import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import NextAuthorizedApiRequest from '@server/interfaces/NextAuthorizedApiRequest';
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

  if (!journey) throw new BadRequestException(1, 'Missing `id` field in query parameters.');
  else res.status(200).json(journey);
});

export default handler;
