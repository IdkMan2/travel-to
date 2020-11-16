import AuthorizationErrorCode from '@utils/enums/AuthorizationErrorCode';

export class AuthorizationException extends Error {
  public readonly code: AuthorizationErrorCode;

  constructor(code: AuthorizationErrorCode, message: string = '') {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, AuthorizationException);
  }
}
