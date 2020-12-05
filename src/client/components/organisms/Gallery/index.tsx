import Grid from '@material-ui/core/Grid';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import IImageResource from '@server/interfaces/resources/IImageResource';
import IJourneyResource from '@server/interfaces/resources/IJourneyResource';
import React, {memo} from 'react';

export interface IGalleryProps {
  images: IJourneyResource['images'];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    item: {
      width: '100%',

      '& > div': {
        position: 'relative',
        paddingTop: '100%',
        border: '8px solid rgba(34, 85, 85, 0.1)',
        backgroundPosition: '50%',
        backgroundSize: 'cover',
        backgroundOrigin: 'border-box',
        backgroundClip: 'padding-box',
        boxShadow: theme.shadows[2],

        '&::before': {
          content: '""',
          position: 'absolute',
          zIndex: -1,
          top: -8,
          right: -8,
          bottom: -8,
          left: -8,
          borderColor: 'transparent',
          background: 'inherit',
          backgroundClip: 'border-box',
          filter: 'blur(9px)',
          clipPath: 'inset(0)',
        },
      },
    },
  })
);

function Gallery(props: IGalleryProps) {
  const {images} = props;
  const classes = useStyles();

  return (
    <Grid container justify={'center'} spacing={4} className={classes.root}>
      {images.map((image: IImageResource) => (
        <Grid key={image._id} item xs={12} md={6} lg={4} xl={3} className={classes.item}>
          <div style={{backgroundImage: `url(${image.url})`}} />
        </Grid>
      ))}
    </Grid>
  );
}

export default memo(Gallery);
