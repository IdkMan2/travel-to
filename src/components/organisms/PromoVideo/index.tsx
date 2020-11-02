import React, {memo} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import VideoBox from "../../molecules/VideoBox";
import promoVideo from "../../../assets/video/promo-video.mp4";
import VideoBoxContent from "../../molecules/VideoBoxContent";

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
}));

function PromoVideo() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <VideoBox
        source={promoVideo}
        classes={{
          root: classes.videoBox_root,
        }}
      >
        <VideoBoxContent
          title={['Your adventure', 'starts here']}
          buttonTitle={'Get started'}
        />
      </VideoBox>
    </div>
  );
}

export default memo(PromoVideo);
