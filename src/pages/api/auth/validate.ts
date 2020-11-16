import commonConfiguration from '@server/configuration/common';
import NextAuthorizedApiRequest from '@server/interfaces/NextAuthorizedApiRequest';
import authMiddleware from '@server/middlewares/auth';
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';

const handler = nextConnect<NextApiRequest, NextApiResponse>()
  .use(commonConfiguration)
  .use(authMiddleware)
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
