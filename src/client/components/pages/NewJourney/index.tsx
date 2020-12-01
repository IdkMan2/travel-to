import 'date-fns';

import Dashboard from '@client/components/layouts/Dashboard';
import Dates from '@client/components/pages/NewJourney/form/Dates';
import Places from '@client/components/pages/NewJourney/form/Places';
import SubmitButton from '@client/components/pages/NewJourney/form/SubmitButton';
import TravelDetails from '@client/components/pages/NewJourney/form/TravelDetails';
import DirectAPI from '@client/mechanisms/DirectAPI';
import ErrorReporting from '@client/mechanisms/ErrorReporting';
import DateFnsUtils from '@date-io/date-fns';
import {Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {Theme} from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {createStyles, makeStyles} from '@material-ui/styles';
import plLocale from 'date-fns/locale/pl';
import {Formik} from 'formik';
import {FormikHelpers} from 'formik/dist/types';
import React, {useCallback} from 'react';

import Header from './form/Header';
import * as utils from './utils';
import {IValues} from './utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2, 2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(3, 12),
      },
    },
    dateField: {
      minWidth: 150,
    },
    dateField_input_formControl: {
      cursor: 'pointer',
    },
  })
);

function NewJourney() {
  const classes = useStyles();

  const handleSubmit = useCallback(async (values: IValues, helpers: FormikHelpers<IValues>) => {
    try {
      await DirectAPI.post('/journeys/new', {
        data: {
          ...values,
          startDate: values.startDate.getTime() / 1000,
          endDate: values.endDate.getTime() / 1000,
          kilometersTraveled: values.kmTraveled,
        },
      });
      //TODO: Redirect to the specified journey
    } catch (e: unknown) {
      ErrorReporting.captureError(e);
      helpers.setStatus('error');
      helpers.setSubmitting(false);
    }
  }, []);

  return (
    <Grid container justify={'center'}>
      <Grid item>
        <Paper className={classes.paper}>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={plLocale}>
            <Formik
              initialValues={utils.initialValues}
              validationSchema={utils.validationSchema}
              onSubmit={handleSubmit}
            >
              {(formik) => (
                <form onSubmit={formik.handleSubmit}>
                  <Header />
                  <Dates />
                  <Places />
                  <TravelDetails />
                  <SubmitButton />
                </form>
              )}
            </Formik>
          </MuiPickersUtilsProvider>
        </Paper>
      </Grid>
    </Grid>
  );
}

NewJourney.layout = Dashboard;

export default NewJourney;
