import AuthorizationErrorCode from '@utils/enums/AuthorizationErrorCode';

export class ForbiddenException extends Error {
  public readonly code: number;
  constructor(code: AuthorizationErrorCode, message: string = 'Unauthorized exception') {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, ForbiddenException);
  }
}
