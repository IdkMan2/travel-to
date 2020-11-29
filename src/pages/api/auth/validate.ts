import buildConfiguration from '@server/configuration/common';
import NextAuthorizedApiRequest from '@server/interfaces/NextAuthorizedApiRequest';
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .use(buildConfiguration({auth: true}))
  .post(async (req: NextAuthorizedApiRequest, res: NextApiResponse) => {
    res.json({
      user: {
        id: req.auth.user.id.toHexString(),
        email: req.auth.user.email,
      },
      token: req.auth.token,
    });
  });

export default handler;
