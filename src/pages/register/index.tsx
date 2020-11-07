import {Theme} from '@material-ui/core';
import {createStyles, makeStyles} from '@material-ui/styles';
import React, {memo} from 'react';

import AcrylicBackground from '../../components/atoms/AcrylicBackground';
import SignUpForm from '../../components/organisms/SignUpForm';

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

  return (
    <AcrylicBackground imageSource={'/assets/images/png/sign-up-background.png'}>
      <div className={classes.formWrapper}>
        <SignUpForm />
      </div>
    </AcrylicBackground>
  );
}

export default memo(Register);
