import Dashboard from '@client/components/layouts/Dashboard';
import {Typography} from '@material-ui/core';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import useTheme from '@material-ui/core/styles/useTheme';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heroText: {
      marginBottom: theme.spacing(4),
    },
    art: {
      display: 'inline',
      maxWidth: 400,
      height: '100%',
      width: '100%',
    },
  })
);

function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const darkMode = theme.palette.type === 'dark';

  const svgUri = darkMode ? '/assets/images/arts/where-we-go-dark.svg' : '/assets/images/arts/where-we-go.svg';

  return (
    <div className={classes.root}>
      <Typography variant={'h4'} align={'center'} color={'textPrimary'} className={classes.heroText}>
        Where do we plan to go today?
      </Typography>
      <img alt={'Where we plan to go'} width={400} height={360} src={svgUri} className={classes.art} />
    </div>
  );
}

Home.layout = Dashboard;

export default Home;
