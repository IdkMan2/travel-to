import React, {memo, useCallback} from 'react';
import {createStyles, Paper, Theme} from '@material-ui/core';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { Formik } from 'formik';
import * as yup from 'yup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

export interface ISignUpFormProps {
  classes?: Partial<ReturnType<typeof useStyles>>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  formWrapper: {
    display: 'flex',
    flexFlow: 'column nowrap',
    margin: theme.spacing(2, 6),
  },
  formHeader: {
    alignSelf: 'center',
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
  },
  form: {
    minWidth: 250,
  },
  securityIcon: {
    backgroundColor: theme.palette.secondary.dark,
    margin: theme.spacing(1),
  },
  formField: {
    display: 'block',
    margin: theme.spacing(2, 0),
  },
  textField_root: {
    '& input:-webkit-autofill': {
      '-webkit-text-fill-color': theme.palette.text.primary,
      'transition': 'background-color 5000s ease-in-out 0s',
      '&:hover, &:focus, &:active': {
        '-webkit-text-fill-color': theme.palette.text.primary,
        'transition': 'background-color 5000s ease-in-out 0s',
      }
    }
  },
  submitBtn: {
    margin: theme.spacing(4, 'auto', 2, 'auto'),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    color: theme.palette.background.default,
  },
  submitBtn_label: {
    color: 'inherit'
  }
}));
const initialValues = { email: '', password: '' };
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
const validationSchema = yup.object().strict(true).shape({
  email: yup.string().trim().email().max(255).required(),
  password: yup.string().trim().min(8).max(255)
    .matches(passwordRegex, 'Password is not strong enough').required()
});

function SignUpForm(props: ISignUpFormProps) {
  let {classes} = props;
  classes = { ...useStyles(), ...classes };

  const validateForm = useCallback(async (/*values: typeof initialValues*/) => {
    return true;
  }, []);

  return (
    <Paper>
      <div className={classes.formWrapper}>
        <div className={classes.formHeader}>
          <Avatar className={classes.securityIcon}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography variant={'h5'}>Sign up</Typography>
        </div>

        <Formik
          initialValues={initialValues}
          validate={validateForm}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
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
              <form
                onSubmit={handleSubmit}
                className={classes?.form}
              >
                <TextField
                  type={'email'} name={'email'}
                  label={'Email address'}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={Boolean(touched.email && errors.email)}
                  helperText={errors.email}
                  className={classes?.formField}
                  classes={{
                    root: classes?.textField_root
                  }}
                  fullWidth
                />
                <TextField
                  type={'password'} name={'password'}
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
                    text: classes?.submitBtn_label
                  }}
                >
                  Create account
                </Button>
              </form>
            )
          }
        </Formik>
      </div>
    </Paper>
  );
}

export default memo(SignUpForm);
