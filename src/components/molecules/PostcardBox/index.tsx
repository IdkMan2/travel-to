import React, {memo, ReactNode, ImgHTMLAttributes} from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import {createStyles, Theme} from '@material-ui/core';

export interface IPostcardBoxProps {
  source?: string;
  classes?: Partial<ReturnType<typeof useStyles>>;
  children?: ReactNode;
  ImageProps?: ImgHTMLAttributes<HTMLImageElement>;
}

const useStyles = makeStyles((_theme: Theme) => createStyles({
  root: {
    position: 'relative',
    top: 0, left: 0,
  },
  image: {
    width: '100%',
    position: 'absolute',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    zIndex: 10,
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    display: 'flex',
    flexFlow: 'column nowrap',
    justifyContent: 'center'
  },
  topGradient: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: '50%',
    background: 'linear-gradient(180deg, rgba(33,33,33,0.6) 0%, rgba(255,255,255,0) 60%, rgba(255,255,255,0) 100%)',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '50%',
    background: 'linear-gradient(0deg, rgba(33,33,33,0.6) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%)',
  },
}));

function PostcardBox(props: IPostcardBoxProps) {
  const {source, children, ImageProps} = props;
  let {classes} = props;

  classes = { ...useStyles(), ...classes };

  return (
    <header className={classes.root}>
      <img
        src={source}
        alt={'Promotion postcard'}
        className={classes.image}
        {...ImageProps}
      />

      <div className={classes.overlay}>
        <div className={classes.topGradient} />
        <div className={classes.bottomGradient} />
        {children}
      </div>
    </header>
  );
}

export default memo(PostcardBox);
