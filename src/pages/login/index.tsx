import {IWithUnprotectedAccessProps, withUnprotectedAccess} from '@ad-hocs/withUnprotectedAccess';
import AcrylicBackground from '@components/atoms/AcrylicBackground';
import SignInForm from '@components/organisms/SignInForm';
import {Theme} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/styles';
import React, {memo} from 'react';

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

  return (
    <AcrylicBackground imageSource={'/assets/images/png/sign-in-background.png'}>
      <div className={classes.formWrapper}>
        <SignInForm />
      </div>
    </AcrylicBackground>
  );
}

export default memo(withUnprotectedAccess(Login));
