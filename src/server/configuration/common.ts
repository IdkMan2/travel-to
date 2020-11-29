import errorsHandler from '@server/mechanisms/errorsHandler';
import notFoundHandler from '@server/mechanisms/notFoundHandler';
import authMiddleware from '@server/middlewares/auth';
import corsMiddleware from '@server/middlewares/cors';
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect, {NextConnect} from 'next-connect';

export interface ICommonConfigurationOptions {
  auth?: boolean;
  cors?: boolean;
}

function buildConfiguration(options: ICommonConfigurationOptions = {}): NextConnect<NextApiRequest, NextApiResponse> {
  const {cors = true, auth = false} = options;
  let connection = nextConnect<NextApiRequest, NextApiResponse>({
    onError: errorsHandler,
    onNoMatch: notFoundHandler,
  });

  if (cors) connection = connection.use(corsMiddleware);
  if (auth) connection = connection.use(authMiddleware);

  return connection;
}

export default buildConfiguration;
