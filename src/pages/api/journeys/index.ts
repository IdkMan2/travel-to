import buildConfiguration from '@server/configuration/common';
import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import {getMongoDb} from '@server/mechanisms/database';
import {Db} from 'mongodb';
import {NextApiRequest, NextApiResponse} from 'next';
import {NextConnect} from 'next-connect';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextConnect<NextApiRequest, NextApiResponse> = buildConfiguration({auth: true}).get(async function (
  req: NextApiRequest,
  res: NextApiResponse
) {
  const mongoDb: Db = await getMongoDb();
  const journeysCollection = mongoDb.collection('journeys');
  const results = await journeysCollection.find({});
  const allDocs: IJourneyResource[] = (await results.toArray()).map((doc: IJourneyCollection[number]) => {
    const newDoc: IJourneyResource & Record<'_id', IJourneyCollection[number]['_id'] | undefined> = {
      ...doc,
      id: doc._id.toHexString(),
      images: [], //TODO: add images to returned docs
    };
    delete newDoc._id;
    return newDoc;
  });
  results.close();
  res.status(200).json(allDocs);
});

export default handler;
