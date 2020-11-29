import buildConfiguration from '@server/configuration/common';
import NextAuthorizedApiRequest from '@server/interfaces/NextAuthorizedApiRequest';
import {revokeJwtToken} from '@server/mechanisms/authentication';
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .use(buildConfiguration({auth: true}))
  .post(async (req: NextAuthorizedApiRequest, res: NextApiResponse) => {
    await revokeJwtToken(req.auth.token);
    res.status(200).end();
  });

export default handler;
