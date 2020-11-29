import {BadRequestException} from '@server/exceptions/BadRequestException';
import {ForbiddenException} from '@server/exceptions/ForbiddenException';
import {NotFoundException} from '@server/exceptions/NotFoundException';
import IGeneralErrorType from '@server/interfaces/IGeneralErrorType';
import {NextApiRequest, NextApiResponse} from 'next';
import {ErrorHandler} from 'next-connect';

const errorsHandler: ErrorHandler<NextApiRequest, NextApiResponse> = function (e, req, res, _next) {
  function end(status: number, body: IGeneralErrorType['error']) {
    res.status(status).json({
      error: body,
    });
  }

  if (e instanceof Error) {
    if (e instanceof BadRequestException) {
      end(400, {code: e.code, message: e.message});
      return;
    }
    if (e instanceof NotFoundException) {
      end(404, {code: e.code, message: e.message});
      return;
    }
    if (e instanceof ForbiddenException) {
      end(403, {code: e.code, message: e.message});
      return;
    }

    end(500, {code: 0, message: e.message});
    return;
  }

  end(500, {code: 0, message: e.toString()});
  return;
};

export default errorsHandler;
