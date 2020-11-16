import IUser from '@client/interfaces/IUser';
import {object, ObjectSchema, string} from 'yup';

import {validationSchema as userValidationSchema} from './IUser';

export default interface ISignUpResponse {
  user: IUser;
  token: string;
}

export const validationSchema: ObjectSchema<ISignUpResponse> = object().strict(true).required().nullable(false).shape({
  user: userValidationSchema,
  token: string().required(),
});

export function isSignUpResponse(obj: any): obj is ISignUpResponse {
  return validationSchema.isValidSync(obj);
}

export function validateSignUpResponse(obj: any): asserts obj is ISignUpResponse {
  validationSchema.validateSync(obj);
}
