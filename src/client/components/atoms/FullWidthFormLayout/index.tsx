import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {memo, ReactNode} from 'react';

export interface IFullWidthFormLayoutProps {
  children?: ReactNode | ReactNode[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formFieldsContainer: {
      margin: 'auto',
    },
    formField: {
      display: 'flex',
      flexDirection: 'column',
      margin: theme.spacing(1.5, 2),
      width: '100%',
    },
  })
);

function FullWidthFormLayout(props: IFullWidthFormLayoutProps) {
  const classes = useStyles();
  const childrens: ReactNode[] = Array.isArray(props.children) ? props.children : [props.children];

  return (
    <Grid container className={classes.formFieldsContainer}>
      {childrens.map((children: ReactNode, index: number) => (
        <Grid key={index} item className={classes.formField}>
          {children}
        </Grid>
      ))}
    </Grid>
  );
}

export default memo(FullWidthFormLayout);
