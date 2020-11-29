import ProgressButton from '@client/components/atoms/ProgressButton';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {useFormikContext} from 'formik';
import React, {memo} from 'react';

import {IValues} from '../utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      margin: theme.spacing(2, 'auto'),
    },
    button: {
      paddingLeft: theme.spacing(8),
      paddingRight: theme.spacing(8),
    },
  })
);

function SubmitButton() {
  const {isSubmitting} = useFormikContext<IValues>();
  const classes = useStyles();

  return (
    <ProgressButton
      variant={'contained'}
      color={'primary'}
      type={'submit'}
      inProgress={isSubmitting}
      className={classes.root}
      ButtonProps={{className: classes.button}}
    >
      Submit
    </ProgressButton>
  );
}

export default memo(SubmitButton);
