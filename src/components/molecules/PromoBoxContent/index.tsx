import React, {ComponentProps, memo} from "react";
import {LinkProps as RouterLinkProps} from "react-router-dom";
import {createStyles, Theme, TypographyProps} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import XLargeButton from "../../atoms/XLargeButton";

export interface IPromoBoxContentProps {
  title: string | string[];
  buttonTitle: string;
  classes?: Partial<ReturnType<typeof useStyles>>;
  TypographyProps?: ComponentProps<typeof Typography>;
  XLargeButtonProps?: Omit<ComponentProps<typeof XLargeButton>, 'to'> & Partial<Pick<RouterLinkProps, 'to'>>;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {},
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

function PromoBoxContent(props: IPromoBoxContentProps) {
  const {title, buttonTitle, XLargeButtonProps, TypographyProps} = props;
  let {classes} = props;

  classes = { ...useStyles(), ...classes };

  const isMediaMdAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const isMediaXLAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('xl'));

  let typographyVariant: TypographyProps['variant'];
  if(isMediaXLAndUp)
    typographyVariant = 'h1';
  else if(isMediaMdAndUp)
    typographyVariant = 'h2';
  else
    typographyVariant = 'h3';

  const titleElements = Array.isArray(title) ? title : [title];

  return (
    <div className={classes.root}>
      {titleElements.map((titleElement: string, index: number) => (
        <Typography
          variant={typographyVariant}
          className={classes?.heroText}
          key={index}
          {...TypographyProps}
        >
          {titleElement}
        </Typography>
      ))}

      <XLargeButton
        className={classes.heroBtn}
        to={'/register'}
        {...XLargeButtonProps}
      >
        {buttonTitle}
      </XLargeButton>
    </div>
  );
}

export default memo(PromoBoxContent);
