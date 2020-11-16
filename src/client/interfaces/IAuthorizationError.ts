import AuthorizationErrorCode from '@utils/enums/AuthorizationErrorCode';
import {number, object, ObjectSchema, string} from 'yup';

export default interface IAuthorizationErrorType {
  error: {
    code: AuthorizationErrorCode;
    message: string;
  };
}

const validationSchema: ObjectSchema<IAuthorizationErrorType> = object()
  .strict(true)
  .required()
  .nullable(false)
  .shape({
    error: object()
      .required()
      .shape({
        code: number<AuthorizationErrorCode>().required().integer().min(0).max(2),
        message: string().required(),
      }),
  });

export function isAuthorizationErrorType(obj: unknown): obj is IAuthorizationErrorType {
  return validationSchema.isValidSync(obj);
}
