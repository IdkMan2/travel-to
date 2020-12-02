import {createStyles, makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, {memo} from 'react';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexFlow: 'column nowrap',
    },
  })
);

export interface IJourneyNotFoundInfoProps {
  id: string;
}

function JourneyNotFoundInfo(props: IJourneyNotFoundInfoProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant={'h3'} gutterBottom>
        Journey not found 😓
      </Typography>
      <Typography variant={'body2'} color={'textSecondary'} align={'center'}>
        {props.id}
      </Typography>
    </div>
  );
}

export default memo(JourneyNotFoundInfo);
