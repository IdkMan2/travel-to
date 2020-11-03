import React, {memo} from "react";
import {Link as RouterLink, LinkProps as RouterLinkProps} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ButtonProps, createStyles, Theme} from "@material-ui/core";
import Button from "@material-ui/core/Button";

export type IXLargeButtonProps = Omit<ButtonProps, 'classes'>
  & RouterLinkProps
  & {
    classes?: Partial<ReturnType<typeof useStyles>>;
  }

const useStyles = makeStyles((theme: Theme) => createStyles({
  button_root: {
    borderWidth: 3,
    '&:hover': {
      borderWidth: 3,
    }
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
  }
}));

function XLargeButton(props: IXLargeButtonProps) {
  let {classes, ...buttonProps} = props;
  classes = { ...useStyles(), ...classes };

  return (
    <Button
      classes={{
        root: classes.button_root,
        label: classes.button_label,
      }}
      variant={"contained"}
      size={"large"}
      component={RouterLink}
      {...buttonProps}
    />
  );
}

export default memo(XLargeButton);
