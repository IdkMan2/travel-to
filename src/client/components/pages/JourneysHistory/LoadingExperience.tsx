import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {memo} from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    overlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.action.disabledBackground,
    },
  })
);

function LoadingExperience({display = false}: {display?: boolean}) {
  const classes = useStyles();

  return (
    <Fade in={display} unmountOnExit>
      <div className={classes.overlay}>
        <CircularProgress color={'secondary'} size={32} />
      </div>
    </Fade>
  );
}

export default memo(LoadingExperience);
