import isValidationError from '@utils/guards/isValidationError';

export function getValidationErrorMessage(e: unknown): string {
  return isValidationError(e) ? e.message : 'unknown valiation error';
}
