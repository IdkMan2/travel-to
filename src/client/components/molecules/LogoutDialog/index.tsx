import useAuthOperations from '@client/hooks/useAuthOperations';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ModalProps} from '@material-ui/core/Modal';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {ExitToApp as LogoutIcon} from '@material-ui/icons';
import {createStyles} from '@material-ui/styles';
import React, {memo, useCallback, useState} from 'react';

export interface ILogoutDialogProps {
  open: ModalProps['open'];
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    actions: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      paddingBottom: theme.spacing(2),
    },
  })
);

function LogoutDialog(props: ILogoutDialogProps) {
  const {open, onClose} = props;
  const classes = useStyles();
  const {signOut} = useAuthOperations();
  const [state, setState] = useState<'idle' | 'inProgress'>('idle');

  const onBtnClick = useCallback(async () => {
    setState('inProgress');
    await signOut();
  }, [signOut]);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='logout-dialog'>
      <DialogTitle id='logout-dialog-title' className={classes.title}>
        Do you really want to leave?
      </DialogTitle>
      <DialogActions className={classes.actions}>
        <Button
          onClick={onBtnClick}
          color={'secondary'}
          variant={'outlined'}
          autoFocus
          startIcon={<LogoutIcon fontSize={'small'} />}
          disabled={state === 'inProgress'}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(LogoutDialog);
