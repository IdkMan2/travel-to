export class InternalServerException extends Error {
  constructor(message: string = 'Internal server error') {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, InternalServerException);
  }
}
