import commonConfiguration from '@server/configuration/common';
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .use(commonConfiguration)
  .get((req: NextApiRequest, res: NextApiResponse) => {
    res.send('Hello world');
  });

export default handler;
