import {ButtonProps, createStyles, Theme} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React, {ForwardedRef, forwardRef, memo} from 'react';

export type IXLargeButtonProps = Omit<ButtonProps, 'classes'> & {
  classes?: Partial<ReturnType<typeof useStyles>>;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button_root: {
      borderWidth: 3,
      '&:hover': {
        borderWidth: 3,
      },
    },
    button_label: {
      ...theme.typography.h4,
    },
    [theme.breakpoints.up('md')]: {
      button_root: {
        padding: theme.spacing(1, 6),
      },
    },
    [theme.breakpoints.up('xl')]: {
      button_root: {
        padding: theme.spacing(1.5, 10),
      },
      button_label: {
        ...theme.typography.h3,
      },
    },
  })
);

const XLargeButton = forwardRef((props: IXLargeButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
  let {classes, ...buttonProps} = props;
  classes = {...useStyles(), ...classes};

  return (
    <Button
      classes={{
        root: classes.button_root,
        label: classes.button_label,
      }}
      variant={'contained'}
      size={'large'}
      ref={ref}
      {...buttonProps}
    />
  );
});

export default memo(XLargeButton);
