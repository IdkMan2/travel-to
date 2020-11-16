import {createStyles, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactNode} from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexFlow: 'column nowrap',
      backgroundColor: theme.palette.background.default,
    },
  })
);

export interface IMainFrameProps {
  children: ReactNode;
}

function MainFrame(props: IMainFrameProps) {
  const {children} = props;
  const classes = useStyles();

  return <main className={classes.root}>{children}</main>;
}

export default MainFrame;
