import {number, object, ObjectSchema, string} from 'yup';

export default interface IDirectApiErrorType {
  error: {
    code: number;
    message: string;
  };
}

const validationSchema: ObjectSchema<IDirectApiErrorType> = object()
  .strict(true)
  .required()
  .nullable(false)
  .shape({
    error: object()
      .required()
      .shape({
        code: number().required().integer().min(0),
        message: string().required(),
      }),
  });

export function isDirectApiErrorType(obj: unknown): obj is IDirectApiErrorType {
  return validationSchema.isValidSync(obj);
}
