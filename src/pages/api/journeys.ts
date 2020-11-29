import buildConfiguration from '@server/configuration/common';
import post from '@server/controllers/journeys/post';
import {NextApiRequest, NextApiResponse} from 'next';
import {NextConnect} from 'next-connect';

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextConnect<NextApiRequest, NextApiResponse> = buildConfiguration({auth: true}).post(post);

export default handler;
