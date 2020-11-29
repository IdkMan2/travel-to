export class NotFoundException extends Error {
  public readonly code: number;

  constructor(code: number = 1, message: string = 'Resource not found') {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    Error.captureStackTrace(this, NotFoundException);
  }
}
