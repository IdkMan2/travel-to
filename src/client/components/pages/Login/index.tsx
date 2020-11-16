import {withUnprotectedAccess} from '@client/ad-hocs/withUnprotectedAccess';
import AcrylicBackground from '@client/components/atoms/AcrylicBackground';
import SignInForm from '@client/components/organisms/SignInForm';
import * as utils from '@client/components/organisms/SignInForm/utils';
import useAuthOperations from '@client/hooks/useAuthOperations';
import {isDirectApiErrorType} from '@client/interfaces/IDirectAPIErrorType';
import {Theme} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/styles';
import {isAxiosError} from '@utils/axios-utils';
import SignInErrorCode from '@utils/enums/SignInErrorCode';
import {FormikHelpers} from 'formik/dist/types';
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

function Login() {
  const classes = useStyles();
  const {signIn} = useAuthOperations();

  const onSubmit = useCallback(
    async (values: typeof utils.initialValues, helpers: FormikHelpers<typeof utils.initialValues>) => {
      const {setSubmitting, setStatus, setFieldError} = helpers;
      try {
        await signIn(values); // context change will handle UI update
      } catch (e: unknown) {
        if (isAxiosError(e)) {
          if (e.response && isDirectApiErrorType(e.response.data)) {
            switch (e.response.data.error.code) {
              case SignInErrorCode.EMAIL_NOT_FOUND: {
                setFieldError('email', 'This email address is not registered');
                return;
              }
              case SignInErrorCode.INVALID_PASSWORD: {
                setFieldError('password', 'Password is invalid');
                return;
              }
            }
          }
        }

        setStatus('error');
        setSubmitting(false);
      }
    },
    [signIn]
  );

  return (
    <AcrylicBackground imageSource={'/assets/images/png/sign-in-background.png'}>
      <div className={classes.formWrapper}>
        <SignInForm onSubmit={onSubmit} />
      </div>
    </AcrylicBackground>
  );
}

export default withUnprotectedAccess(memo(Login));
