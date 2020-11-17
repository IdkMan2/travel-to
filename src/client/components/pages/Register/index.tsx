import {withUnprotectedAccess} from '@client/ad-hocs/withUnprotectedAccess';
import AcrylicBackground from '@client/components/atoms/AcrylicBackground';
import SignUpForm from '@client/components/organisms/SignUpForm';
import * as utils from '@client/components/organisms/SignUpForm/utils';
import useAuthOperations from '@client/hooks/useAuthOperations';
import {isDirectApiErrorType} from '@client/interfaces/IDirectAPIErrorType';
import {Theme} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/styles';
import {isAxiosError} from '@utils/axios-utils';
import SignUpErrorCode from '@utils/enums/SignUpErrorCode';
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

function Register() {
  const classes = useStyles();
  const {signUp} = useAuthOperations();

  const onSubmit = useCallback(
    async (values: typeof utils.initialValues, helpers: FormikHelpers<typeof utils.initialValues>) => {
      const {setSubmitting, setStatus, setFieldError} = helpers;
      try {
        await signUp(values); // context change will handle UI update
      } catch (e: unknown) {
        if (isAxiosError(e)) {
          if (e.response && isDirectApiErrorType(e.response.data)) {
            switch (e.response.data.error.code) {
              case SignUpErrorCode.EMAIL_ALREADY_TAKEN: {
                setFieldError('email', 'This email address is already registered');
                return;
              }
            }
          }
        }

        setStatus('error');
        setSubmitting(false);
      }
    },
    [signUp]
  );

  return (
    <AcrylicBackground imageSource={'/assets/images/backgrounds/sign-up-background.png'}>
      <div className={classes.formWrapper}>
        <SignUpForm onSubmit={onSubmit} />
      </div>
    </AcrylicBackground>
  );
}

export default withUnprotectedAccess(memo(Register));
