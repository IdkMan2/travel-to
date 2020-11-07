import {Paper} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import classNames from 'classnames';
import {Formik} from 'formik';
import React, {memo, useCallback} from 'react';

import Link from '../../atoms/NextLink';
import useStyles from './styles';
import * as utils from './utils';

export interface ISignInFormProps {
  classes?: Partial<ReturnType<typeof useStyles>>;
}

function SignInForm(props: ISignInFormProps) {
  let {classes} = props;
  classes = {...useStyles(), ...classes};

  const validateForm = useCallback(
    async (/*values: typeof initialValues*/) => {
      return true;
    },
    []
  );

  return (
    <Paper className={classes.paper} elevation={10}>
      <div className={classes.formWrapper}>
        <div className={classes.formHeader}>
          <Avatar className={classes.securityIcon}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography variant={'h5'}>Sign in</Typography>
        </div>

        <Formik
          initialValues={utils.initialValues}
          validate={validateForm}
          validationSchema={utils.validationSchema}
          onSubmit={(values, {setSubmitting}) => {
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit} className={classes?.form}>
              <TextField
                type={'email'}
                name={'email'}
                label={'Email address'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={errors.email}
                className={classes?.formField}
                classes={{
                  root: classes?.textField_root,
                }}
                fullWidth
              />
              <TextField
                type={'password'}
                name={'password'}
                label={'Your password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={errors.password}
                className={classes?.formField}
                fullWidth
              />

              <Button
                type={'submit'}
                color={'primary'}
                variant={'contained'}
                disabled={isSubmitting}
                className={classNames(classes?.formField, classes?.submitBtn)}
                classes={{
                  text: classes?.submitBtn_label,
                }}
              >
                Log in
              </Button>

              <div className={classes?.linksWrapper}>
                <Link href={'/register'} align={'center'} className={classes?.link}>
                  Don't have an account yet? <br />
                  Sign up
                </Link>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </Paper>
  );
}

export default memo(SignInForm);
