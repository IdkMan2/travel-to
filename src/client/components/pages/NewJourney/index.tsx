import 'date-fns';

import Dashboard from '@client/components/layouts/Dashboard';
import DirectAPI from '@client/mechanisms/DirectAPI';
import ErrorReporting from '@client/mechanisms/ErrorReporting';
import DateFnsUtils from '@date-io/date-fns';
import {Paper} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import {Theme} from '@material-ui/core/styles';
import {MuiPickersUtilsProvider} from '@material-ui/pickers';
import {createStyles, makeStyles} from '@material-ui/styles';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import plLocale from 'date-fns/locale/pl';
import {Formik} from 'formik';
import {FormikHelpers} from 'formik/dist/types';
import {useRouter} from 'next/router';
import React, {useCallback, useState} from 'react';

import Dates from './form/Dates';
import Dropzone from './form/Dropzone';
import Header from './form/Header';
import Places from './form/Places';
import SubmitButton from './form/SubmitButton';
import TravelDetails from './form/TravelDetails';
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
    form: {
      width: 475,
      maxWidth: '100vw',
    },
  })
);

function NewJourney() {
  const classes = useStyles();
  const [files, setFiles] = useState<File[]>([]);
  const router = useRouter();

  const handleDropzoneChange = useCallback(
    (files: File[]) => {
      setFiles(files);
    },
    [setFiles]
  );
  const handleDropzoneDelete = useCallback(
    (file: File) => {
      setFiles(files.slice(files.indexOf(file), 1));
    },
    [files, setFiles]
  );

  const handleSubmit = useCallback(
    async (values: IValues, helpers: FormikHelpers<IValues>) => {
      try {
        const response = await DirectAPI.post<IJourneyResource>('/journeys/new', {
          data: utils.prepareFormData(values, files),
          headers: {
            'content-type': 'multipart/form-data',
          },
        });

        await router.push(`/home/journeys/${response.data._id}`);
      } catch (e: unknown) {
        ErrorReporting.captureError(e);
        helpers.setStatus('error');
        helpers.setSubmitting(false);
      }
    },
    [files, router]
  );

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
                <form onSubmit={formik.handleSubmit} className={classes.form}>
                  <Header />
                  <Dates />
                  <Places />
                  <TravelDetails />
                  <Dropzone onChange={handleDropzoneChange} onDelete={handleDropzoneDelete} />
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
