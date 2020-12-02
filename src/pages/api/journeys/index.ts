import buildConfiguration from '@server/configuration/common';
import IJourneyCollection from '@server/interfaces/collections/IJourneyCollection';
import NextAuthorizedApiRequest from '@server/interfaces/NextAuthorizedApiRequest';
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
  req: NextAuthorizedApiRequest,
  res: NextApiResponse
) {
  const mongoDb: Db = await getMongoDb();
  const journeysCollection = mongoDb.collection('journeys');
  const results = await journeysCollection.find({userId: req.auth.user.id});
  const allDocs: Omit<IJourneyResource, 'images'>[] = (await results.toArray()).map(
    (doc: IJourneyCollection[number]) => {
      const newDoc: Partial<Omit<IJourneyResource, 'images'>> = {
        ...doc,
        _id: doc._id.toHexString(),
        userId: doc.userId.toHexString(),
      };
      delete newDoc._id;
      delete newDoc.userId;
      return newDoc as Omit<IJourneyResource, 'images'>;
    }
  );
  results.close();
  res.status(200).json(allDocs);
});

export default handler;
