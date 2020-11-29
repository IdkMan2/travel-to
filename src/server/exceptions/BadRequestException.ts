export class BadRequestException extends Error {
  public readonly code: number;

  constructor(code: number, message: string = 'Bad request') {
    super(message);
    this.code = code;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, BadRequestException);
  }
}
