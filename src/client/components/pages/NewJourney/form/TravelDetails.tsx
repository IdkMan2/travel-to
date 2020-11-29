import FullWidthFormLayout from '@client/components/atoms/FullWidthFormLayout';
import InputAdornment from '@material-ui/core/InputAdornment';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import RunIcon from '@material-ui/icons/DirectionsRunOutlined';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import React, {memo} from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    field: {
      alignSelf: 'center',
      width: '50%',
    },
  })
);

function TravelDetails() {
  const classes = useStyles();

  return (
    <FullWidthFormLayout>
      <Field
        key={'left'}
        component={TextField}
        label={'Kilometers traveled'}
        name={'kmTraveled'}
        type={'number'}
        fullWidth
        required
        InputLabelProps={{shrink: true}}
        className={classes.field}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <RunIcon />
            </InputAdornment>
          ),
          endAdornment: <InputAdornment position='start'>km</InputAdornment>,
          min: 0,
        }}
      />
    </FullWidthFormLayout>
  );
}

export default memo(TravelDetails);
