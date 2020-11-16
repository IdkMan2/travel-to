import IUser, {validationSchema as userValidationSchema} from '@client/interfaces/IUser';
import {object, ObjectSchema, string} from 'yup';

export enum AuthState {
  LOADING,
  AUTHORIZED,
  UNAUTHORIZED,
}
export default interface IAuthData {
  user: IUser;
  token: string;
}

export const validationSchema: ObjectSchema<IAuthData> = object().strict(true).required().nullable(false).shape({
  user: userValidationSchema,
  token: string().required(),
});

export function isAuthData(obj: any): obj is IAuthData {
  return validationSchema.isValidSync(obj);
}

export function validateAuthData(obj: any): asserts obj is IAuthData {
  validationSchema.validateSync(obj);
}
