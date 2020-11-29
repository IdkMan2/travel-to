import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {memo, ReactNode} from 'react';

export interface IDoubleSideFormLayoutProps {
  left?: ReactNode;
  right?: ReactNode;
  children?: [ReactNode?, ReactNode?];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formFieldsContainer: {
      margin: 'auto',
      flexFlow: 'row nowrap',
    },
    formField: {
      display: 'flex',
      flexDirection: 'row',
      margin: theme.spacing(1.5, 2),

      [theme.breakpoints.up('md')]: {
        width: `calc(50% - ${theme.spacing(4)}px)`,
      },
    },
  })
);

function DoubleSideFormLayout(props: IDoubleSideFormLayoutProps) {
  const classes = useStyles();
  const {left, right, children} = props;

  return (
    <Grid container className={classes.formFieldsContainer}>
      <Grid item className={classes.formField}>
        {left ?? (children && children[0])}
      </Grid>
      <Grid item className={classes.formField}>
        {right ?? (children && children[1])}
      </Grid>
    </Grid>
  );
}

export default memo(DoubleSideFormLayout);
