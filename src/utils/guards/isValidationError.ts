import {ValidationError} from 'yup';

export default function isValidationError(e: unknown): e is ValidationError {
  return typeof e === 'object' && e !== null && e instanceof ValidationError;
}
