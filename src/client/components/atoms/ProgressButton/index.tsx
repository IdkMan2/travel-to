import useMergeClasses from '@client/hooks/useMergeClasses';
import Button, {ButtonProps} from '@material-ui/core/Button';
import CircularProgress, {CircularProgressProps} from '@material-ui/core/CircularProgress';
import {green} from '@material-ui/core/colors';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import React, {DetailedHTMLProps, HTMLAttributes, memo} from 'react';

export interface IProgressButtonProps extends Omit<ButtonProps, 'classes' | 'className'> {
  classes?:
    | Partial<ReturnType<typeof useStyles>>
    | ((classes: ReturnType<typeof useStyles>) => Partial<ReturnType<typeof useStyles>>);
  className?: string;
  inProgress?: boolean;
  WrapperProps?: Partial<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>>;
  ButtonProps?: Partial<ButtonProps>;
  CircularProgressProps?: Partial<CircularProgressProps>;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
    circularProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -18,
      marginLeft: -18,
    },
  })
);

function ProgressButton(props: IProgressButtonProps) {
  const {
    classes: externalClasses,
    className,
    inProgress = false,
    WrapperProps,
    ButtonProps,
    CircularProgressProps,
    ...buttonProps
  } = props;
  const classes = useMergeClasses(useStyles(), externalClasses);

  return (
    <span className={classNames(classes.root, className)} {...WrapperProps}>
      <Button disabled={inProgress} {...buttonProps} {...ButtonProps} />
      {inProgress && <CircularProgress size={36} className={classes.circularProgress} {...CircularProgressProps} />}
    </span>
  );
}

export default memo(ProgressButton);
