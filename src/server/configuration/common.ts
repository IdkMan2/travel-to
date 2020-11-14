import corsMiddleware from '@server/middlewares/cors';
import {NextApiRequest, NextApiResponse} from 'next';
import nextConnect from 'next-connect';

const commonConfiguration = nextConnect<NextApiRequest, NextApiResponse>().use(corsMiddleware);

export default commonConfiguration;
