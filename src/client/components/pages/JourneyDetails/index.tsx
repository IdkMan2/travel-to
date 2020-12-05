import ErrorAlert from '@client/components/atoms/ErrorAlert';
import JourneyNotFoundInfo from '@client/components/atoms/JourneyNotFoundInfo';
import LoadingExperience from '@client/components/atoms/LoadingExperience';
import Dashboard, {IDashboardProps} from '@client/components/layouts/Dashboard';
import Gallery from '@client/components/organisms/Gallery';
import JourneyDetailsList from '@client/components/organisms/JourneyDetailsList';
import usePrevious from '@client/hooks/usePrevious';
import {IComponentWithLayout} from '@client/interfaces/ILayout';
import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {isAxiosError} from '@utils/axios-utils';
import {useRouter} from 'next/router';
import React, {useCallback, useEffect, useState} from 'react';

import useFetchJourney from './useFetchJourney';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gridBox: {
      maxWidth: 500,
    },
    paper: {
      padding: theme.spacing(2, 3),
    },
    details: {
      margin: theme.spacing(2, 'auto'),
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing(4, 'auto'),
      },
    },
  })
);

const Page: IComponentWithLayout<IDashboardProps> = function JourneyDetails() {
  const classes = useStyles();
  const router = useRouter();
  const journeyId = router.query.id;
  const [loading, error, journey] = useFetchJourney(journeyId);
  const prevError = usePrevious(error);
  const [errorAlertOpen, setErrorAlertOpen] = useState<boolean>(error !== undefined);

  const handleErrorAlertClose = useCallback(() => {
    setErrorAlertOpen(false);
  }, [setErrorAlertOpen]);

  useEffect(() => {
    if (prevError === undefined && error !== undefined && !(isAxiosError(error) && error.response?.status === 404))
      setErrorAlertOpen(true);
  }, [error, prevError, setErrorAlertOpen]);

  const journeyNotFound = typeof journeyId !== 'string' || (isAxiosError(error) && error.response?.status === 404);

  return (
    <>
      {!loading && journeyNotFound ? (
        <JourneyNotFoundInfo id={typeof journeyId === 'string' ? journeyId : ''} />
      ) : (
        journey && (
          <>
            <Grid container justify={'center'}>
              <Grid item xs={12} lg={6} className={classes.gridBox}>
                <JourneyDetailsList journey={journey} className={classes.details} />
              </Grid>
            </Grid>
            <Gallery images={journey.images} />
          </>
        )
      )}

      <LoadingExperience display={loading} />
      <ErrorAlert open={errorAlertOpen} onClose={handleErrorAlertClose} />
    </>
  );
};

Page.layout = Dashboard;

export default Page;
