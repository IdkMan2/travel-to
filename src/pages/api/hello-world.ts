import buildConfiguration from '@server/configuration/common';
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .use(buildConfiguration())
  .get((req: NextApiRequest, res: NextApiResponse) => {
    res.send('Hello world');
  });

export default handler;
