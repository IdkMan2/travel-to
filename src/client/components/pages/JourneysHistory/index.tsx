import ErrorAlert from '@client/components/atoms/ErrorAlert';
import LoadingExperience from '@client/components/atoms/LoadingExperience';
import Dashboard from '@client/components/layouts/Dashboard';
import usePrevious from '@client/hooks/usePrevious';
import {Table} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import TableContainer from '@material-ui/core/TableContainer';
import React, {useCallback, useEffect, useState} from 'react';

import TableBody from './table/Body';
import TableHead from './table/Head';
import useFetchJourneys from './useFetchJourneys';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
    paper: {
      position: 'relative',
      minHeight: 500,
      maxWidth: '100vw',
      overflow: 'scroll',
    },
    table: {
      minWidth: 650,
    },
  })
);

function JourneysHistory() {
  const classes = useStyles();
  const [loading, error, data] = useFetchJourneys();
  const prevError = usePrevious(error);
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(error !== undefined);

  const handleErrorAlertClose = useCallback(() => {
    setErrorAlertOpen(false);
  }, [setErrorAlertOpen]);

  useEffect(() => {
    if (prevError === undefined && error !== undefined) setErrorAlertOpen(true);
  }, [error, prevError, setErrorAlertOpen]);

  return (
    <Grid container justify={'center'} className={classes.root}>
      <Grid item>
        <TableContainer component={Paper} className={classes.paper}>
          <Table className={classes.table} aria-label={'Journeys history'}>
            <TableHead />
            <TableBody journeys={!loading && data ? data : []} />
          </Table>

          <LoadingExperience display={loading} />
        </TableContainer>

        <ErrorAlert open={errorAlertOpen} onClose={handleErrorAlertClose} />
      </Grid>
    </Grid>
  );
}

JourneysHistory.layout = Dashboard;

export default JourneysHistory;
