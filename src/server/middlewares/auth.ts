import {NextApiResponse} from 'next';
import {verifyJwtToken} from '@server/mechanisms/authentication';
import IJwtPayload from '@server/interfaces/IJwtPayload';
import User from '@server/models/User';
import NextAuthorizedApiRequest from '@server/interfaces/NextAuthorizedApiRequest';
import {JwtTokenVerificationException} from '@server/exceptions/JwtTokenVerificationException';
import AuthorizationErrorCode from '@utils/enums/AuthorizationErrorCode';

const bearerPrefixLength = 'Bearer '.length;

export default async function authMiddleware(
  req: Omit<NextAuthorizedApiRequest, 'auth'> & Partial<Pick<NextAuthorizedApiRequest, 'auth'>>,
  res: NextApiResponse,
  next: (error?: unknown) => void
) {
  if (typeof req.headers.authorization !== 'string') {
    res.status(403).json({
      error: {
        code: AuthorizationErrorCode.MISSING_BEARER_TOKEN,
        message: 'Missing `Authorization` header. Expected `Bearer token` in place of `Authorization` header.',
      },
    });
    return;
  }

  const pureToken = req.headers.authorization.substring(bearerPrefixLength);
  let payload: IJwtPayload;
  try {
    payload = await verifyJwtToken(pureToken);
  } catch (e: unknown) {
    res.status(403).json({
      error: {
        code: AuthorizationErrorCode.INVALID_JWT_TOKEN,
        message:
          'Found invalid JWT token: ' + (e instanceof JwtTokenVerificationException ? e.message : 'UNKNOWN_ERROR'),
      },
    });
    return;
  }

  const user = await User.getById(payload.userId);
  if (user === null) {
    res.status(403).json({
      error: {
        code: AuthorizationErrorCode.USER_NOT_LONGER_EXISTS,
        message: "User account associated with this account doesn't exists anymore.",
      },
    });
    return;
  }

  req.auth = {user, token: pureToken};
  next();
}
