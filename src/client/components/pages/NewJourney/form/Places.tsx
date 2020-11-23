import FullWidthFormLayout from '@client/components/atoms/FullWidthFormLayout';
import InputAdornment from '@material-ui/core/InputAdornment';
import MapIcon from '@material-ui/icons/MapOutlined';
import PinIcon from '@material-ui/icons/RoomOutlined';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import React, {memo} from 'react';

function Places() {
  return (
    <FullWidthFormLayout>
      <Field
        component={TextField}
        label={'Start point'}
        name={'startPoint'}
        fullWidth
        InputLabelProps={{shrink: true}}
        placeholder={'Where do we start?'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <MapIcon />
            </InputAdornment>
          ),
        }}
      />
      <Field
        component={TextField}
        label={'End point'}
        name={'endPoint'}
        fullWidth
        InputLabelProps={{shrink: true}}
        placeholder={'Where are we heading?'}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <PinIcon />
            </InputAdornment>
          ),
        }}
      />
    </FullWidthFormLayout>
  );
}

export default memo(Places);
