import JwtTokenVerificationError from '@utils/enums/JwtTokenVerificationError';

export class JwtTokenVerificationException extends Error {
  constructor(reason: JwtTokenVerificationError) {
    super(reason);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, JwtTokenVerificationException);
  }
}
