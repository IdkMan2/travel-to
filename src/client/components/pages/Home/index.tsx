import Dashboard from '@client/components/layouts/Dashboard';
import {Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10%',
    },
    heroText: {
      marginBottom: theme.spacing(4),
    },
    art: {
      width: '100%',
      maxWidth: 400,
    },
  })
);

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant={'h4'} align={'center'} color={'textPrimary'} className={classes.heroText}>
        Where do we plan to go today?
      </Typography>
      <img alt={'Where we plan to go'} src={'/assets/images/arts/where-we-go.svg'} className={classes.art} />
    </div>
  );
}

Home.layout = Dashboard;

export default Home;
