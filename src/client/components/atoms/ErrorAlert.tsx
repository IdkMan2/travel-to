import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert/Alert';
import React, {memo} from 'react';

export interface IErrorAlertProps {
  open?: boolean;
  onClose?: () => unknown;
}

function ErrorAlert(props: IErrorAlertProps) {
  const {open = false, onClose} = props;

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert onClose={onClose} severity='error'>
        There was an unknown error ⚡
      </Alert>
    </Snackbar>
  );
}

export default memo(ErrorAlert);
