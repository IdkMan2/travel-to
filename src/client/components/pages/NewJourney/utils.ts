export const NOW_TIME_MILlIS = new Date().getTime();
export const ONE_DAY_MILLIS = 24 * 60 * 60 * 1000;

export const initialValues = {
  startDate: new Date(NOW_TIME_MILlIS),
  startPoint: '',
  endDate: new Date(NOW_TIME_MILlIS + ONE_DAY_MILLIS), // +1 day
  endPoint: '',
  kmTraveled: 0,
};
