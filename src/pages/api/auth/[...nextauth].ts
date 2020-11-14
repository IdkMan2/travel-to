import {authorize} from '@server/authorization';
import {NextApiRequest, NextApiResponse} from 'next';
import NextAuth, {InitOptions} from 'next-auth';
import Providers from 'next-auth/providers';

const options: InitOptions = {
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: {label: 'Email address', type: 'email'},
        password: {label: 'Password', type: 'password'},
      },
      authorize: authorize,
    }),
  ],
  session: {
    jwt: true,
  },
  jwt: {},
  secret: process.env.NEXT_AUTH_SECRET,
  database: process.env.MONGODB_URI,
};

function requestHandler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, options);
}

export default requestHandler;
