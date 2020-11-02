import React, {ComponentProps, memo} from "react";
import {createStyles, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import XLargeButton from "../../atoms/XLargeButton";

export interface VideoBoxContentProps {
  title: string | string[];
  buttonTitle: string;
  classes?: Partial<ReturnType<typeof useStyles>>;
  TypographyProps?: ComponentProps<typeof Typography>;
  XLargeButtonProps?: ComponentProps<typeof XLargeButton>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    marginLeft: '7.5%',
  },
  heroText: {
    fontFamily: `'Anton', sans-serif`,
    color: theme.palette.getContrastText('#000000'),
    textShadow: '6px 6px 0px rgba(0,0,0,0.2)',
  },
  heroBtn: {
    alignSelf: 'flex-start',
    marginTop: 24,
  },
}));

function VideoBoxContent(props: VideoBoxContentProps) {
  const {title, buttonTitle, XLargeButtonProps, TypographyProps} = props;
  let {classes} = props;
  const mediaXLAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  classes = { ...useStyles(), ...classes };

  const titleElements = Array.isArray(title) ? title : [title];

  return (
    <div className={classes.root}>
      {titleElements.map((titleElement: string, index: number) => (
        <Typography
          variant={mediaXLAndUp ? 'h1' : 'h2'}
          className={classes?.heroText}
          key={index}
          {...TypographyProps}
        >
          {titleElement}
        </Typography>
      ))}

      <XLargeButton
        variant={"contained"}
        className={classes.heroBtn}
        {...XLargeButtonProps}
      >
        {buttonTitle}
      </XLargeButton>
    </div>
  );
}

export default memo(VideoBoxContent);
