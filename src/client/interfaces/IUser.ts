import {object, ObjectSchema, string} from 'yup';

export default interface IUser {
  id: string;
  email: string;
}

export const validationSchema: ObjectSchema<IUser> = object().strict(true).required().nullable(false).shape({
  id: string().required(),
  email: string().required(),
});

export function isUserObject(obj: any): obj is IUser {
  return validationSchema.isValidSync(obj);
}
