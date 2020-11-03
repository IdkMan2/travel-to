import React, {memo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import VideoBox from "../../molecules/VideoBox";
import PromoBoxContent from "../../molecules/PromoBoxContent";
import PostcardBox from "../../molecules/PostcardBox";
import promoVideo from "../../../assets/video/promo-video.mp4";
import promoPostcard from '../../../assets/png/promo-postcard.png';

const useStyles = makeStyles((_theme: Theme) => createStyles({
  root: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    minHeight: '100vh'
  },
  videoBox_root: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
  },
  videoBoxContent_root: {
    margin: '0 0 0 10%',
  },
  postcardBoxContent_root: {
    margin: '0 24px',
    transform: 'translateY(-100%)'
  },
}));

function PromoSection() {
  const classes = useStyles();
  const isMediaMdAndUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  return (
    <div className={classes.root}>
      {isMediaMdAndUp
      ? (
          <VideoBox
            source={promoVideo}
            classes={{
              root: classes.videoBox_root,
            }}
          >
            <PromoBoxContent
              title={['Your adventure', 'starts here']}
              buttonTitle={'Sign up'}
              classes={{
                root: classes.videoBoxContent_root
              }}
            />
          </VideoBox>
        )
      : (
          <PostcardBox
            source={promoPostcard}
            classes={{
              root: classes.videoBox_root,
            }}
          >
            <PromoBoxContent
              title={['Your adventure', 'starts here']}
              buttonTitle={'Sign up'}
              classes={{
                root: classes.postcardBoxContent_root
              }}
            />
          </PostcardBox>
        )
      }
    </div>
  );
}

export default memo(PromoSection);
