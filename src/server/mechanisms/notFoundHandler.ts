import {NotFoundException} from '@server/exceptions/NotFoundException';
import {NextApiRequest, NextApiResponse} from 'next';
import {RequestHandler} from 'next-connect';

const notFoundHandler: RequestHandler<NextApiRequest, NextApiResponse> = function () {
  throw new NotFoundException();
};

export default notFoundHandler;
