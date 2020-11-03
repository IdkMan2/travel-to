import React, {MediaHTMLAttributes, memo, ReactNode, SourceHTMLAttributes} from "react";
import {createStyles, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

export interface IVideoBoxProps {
  source?: string;
  classes?: Partial<ReturnType<typeof useStyles>>;
  children?: ReactNode;
  VideoProps?: MediaHTMLAttributes<HTMLVideoElement>;
  SourceProps?: SourceHTMLAttributes<HTMLSourceElement>;
}

const useStyles = makeStyles((_theme: Theme) => createStyles({
  root: {
    position: 'relative',
    top: 0, left: 0,
  },
  video: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    minWidth: '100%', minHeight: '100%'
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
    background: 'linear-gradient(180deg, rgba(33,33,33,0.6) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 100%)',
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    height: '50%',
    background: 'linear-gradient(0deg, rgba(33,33,33,0.6) 0%, rgba(255,255,255,0) 20%, rgba(255,255,255,0) 100%)',
  },
}));

function VideoBox(props: IVideoBoxProps) {
  const {source, children, SourceProps, VideoProps} = props;
  let {classes} = props;

  classes = { ...useStyles(), ...classes };

  return (
    <header className={classes.root}>
      <video
        autoPlay muted loop
        className={classes.video}
        {...VideoProps}
      >
        <source
          src={source}
          type={'video/mp4'}
          {...SourceProps}
        />
        Your browser does not support HTML5 video.
      </video>

      <div className={classes.overlay}>
        <div className={classes.topGradient} />
        <div className={classes.bottomGradient} />
        {children}
      </div>
    </header>
  );
}

export default memo(VideoBox);
