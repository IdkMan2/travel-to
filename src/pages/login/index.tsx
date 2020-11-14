import {IWithUnprotectedAccessProps, withUnprotectedAccess} from '@ad-hocs/withUnprotectedAccess';
import AcrylicBackground from '@components/atoms/AcrylicBackground';
import SignInForm from '@components/organisms/SignInForm';
import * as utils from '@components/organisms/SignInForm/utils';
import {Theme} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/styles';
import {FormikHelpers} from 'formik/dist/types';
import {signin} from 'next-auth/client';
import React, {memo, useCallback} from 'react';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    formWrapper: {
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

function Login(_props: IWithUnprotectedAccessProps) {
  const classes = useStyles();

  const onSubmit = useCallback(
    async (values: typeof utils.initialValues, helpers: FormikHelpers<typeof utils.initialValues>) => {
      const {setSubmitting, setStatus} = helpers;
      try {
        await signin('credentials', values);
        setStatus('success');
      } catch (e: unknown) {
        setStatus('error');
      } finally {
        setSubmitting(false);
      }
    },
    []
  );

  return (
    <AcrylicBackground imageSource={'/assets/images/png/sign-in-background.png'}>
      <div className={classes.formWrapper}>
        <SignInForm onSubmit={onSubmit} />
      </div>
    </AcrylicBackground>
  );
}

export default memo(withUnprotectedAccess(Login));
