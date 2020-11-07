import {createStyles, Theme} from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, {memo} from 'react';

import PostcardBox from '../../molecules/PostcardBox';
import PromoBoxContent from '../../molecules/PromoBoxContent';
import VideoBox from '../../molecules/VideoBox';

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      minHeight: '100vh',
    },
    videoBox_root: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    videoBoxContent_root: {
      margin: '0 0 0 10%',
    },
    postcardBoxContent_root: {
      margin: '0 24px',
      transform: 'translateY(-100%)',
    },
  })
);

function PromoSection() {
  const classes = useStyles();
  const isMediaMdAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <div className={classes.root}>
      {isMediaMdAndUp ? (
        <VideoBox
          source={'/assets/videos/promo-video.mp4'}
          classes={{
            root: classes.videoBox_root,
          }}
        >
          <PromoBoxContent
            title={['Your adventure', 'starts here']}
            buttonTitle={'Sign up'}
            classes={{
              root: classes.videoBoxContent_root,
            }}
            LinkProps={{
              href: '/register',
            }}
          />
        </VideoBox>
      ) : (
        <PostcardBox
          source={'/assets/images/png/promo-postcard.png'}
          classes={{
            root: classes.videoBox_root,
          }}
        >
          <PromoBoxContent
            title={['Your adventure', 'starts here']}
            buttonTitle={'Sign up'}
            classes={{
              root: classes.postcardBoxContent_root,
            }}
          />
        </PostcardBox>
      )}
    </div>
  );
}

export default memo(PromoSection);
