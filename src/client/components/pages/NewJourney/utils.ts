import {date, number, object, ObjectSchema, string} from 'yup';

export const NOW_TIME_MILlIS = new Date().getTime();
export const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;

export interface IValues {
  startDate: Date;
  endDate: Date;
  startPoint: string;
  endPoint: string;
  kmTraveled: number;
}

export const initialValues: IValues = {
  startDate: new Date(NOW_TIME_MILlIS),
  endDate: new Date(NOW_TIME_MILlIS + ONE_DAY_MILLIS), // +1 day
  startPoint: '',
  endPoint: '',
  kmTraveled: 0,
};

export const validationSchema: ObjectSchema<IValues> = object()
  .required()
  .shape({
    startDate: date().required('This is a required field'),
    endDate: date().required('This is a required field'),
    startPoint: string().required('This is a required field'),
    endPoint: string().required('This is a required field'),
    kmTraveled: number().required().integer().positive("Field 'Kilometers traveled' requires a positive number."),
  });
