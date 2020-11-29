import DoubleSideFormLayout from '@client/components/atoms/DoubleSideFormLayout';
import InputAdornment from '@material-ui/core/InputAdornment';
import CalendarIcon from '@material-ui/icons/CalendarTodayOutlined';
import {createStyles, makeStyles} from '@material-ui/styles';
import {Field, useFormikContext} from 'formik';
import {DatePicker} from 'formik-material-ui-pickers';
import React, {memo, useEffect, useMemo} from 'react';

import * as utils from '../utils';

const useStyles = makeStyles(() =>
  createStyles({
    dateField_input_formControl: {
      cursor: 'pointer',
    },
  })
);

function Dates() {
  const classes = useStyles();
  const formik = useFormikContext<typeof utils.initialValues>();
  const dates: [startDate: Date, endDate: Date] = useMemo(() => {
    return [formik.values.startDate, formik.values.endDate];
  }, [formik]);

  useEffect(() => {
    if (dates[0].getTime() > dates[1].getTime())
      formik.setFieldValue('endDate', dates[0].getTime() + utils.ONE_DAY_MILLIS);
  }, [dates, formik]);

  return (
    <DoubleSideFormLayout>
      {[
        <Field
          key={'left'}
          format={'dd.MM.yyyy'}
          component={DatePicker}
          label={'Start date'}
          name={'startDate'}
          allowKeyboardControl={false}
          inputProps={{
            style: {
              textAlign: 'right',
              cursor: 'pointer',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CalendarIcon />
              </InputAdornment>
            ),
            classes: {
              formControl: classes.dateField_input_formControl,
            },
          }}
        />,
        <Field
          key={'right'}
          format={'dd.MM.yyyy'}
          component={DatePicker}
          label={'End date'}
          name={'endDate'}
          minDate={dates[0]}
          allowKeyboardControl={false}
          inputProps={{
            style: {
              textAlign: 'right',
              cursor: 'pointer',
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <CalendarIcon />
              </InputAdornment>
            ),
            classes: {
              formControl: classes.dateField_input_formControl,
            },
          }}
        />,
      ]}
    </DoubleSideFormLayout>
  );
}

export default memo(Dates);
