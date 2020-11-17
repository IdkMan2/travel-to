import {ModalProps, Theme} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {makeStyles} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Toolbar from '@material-ui/core/Toolbar';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {AddCircleOutline, Explore} from '@material-ui/icons';
import {createStyles, useTheme} from '@material-ui/styles';
import React, {memo} from 'react';

export interface IAppDrawerProps {
  open: ModalProps['open'];
  onOpen: React.ReactEventHandler<{}>;
  onClose: React.ReactEventHandler<{}>;
}

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawer_paper: {
      width: DRAWER_WIDTH,
    },
    drawerContainer: {
      overflow: 'auto',
    },
  })
);

function AppDrawer(props: IAppDrawerProps) {
  const {open, onOpen, onClose} = props;
  const classes = useStyles();
  const theme: Theme = useTheme();
  const isMediaSmDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <SwipeableDrawer
      style={{zIndex: theme.zIndex.drawer - 1}}
      className={classes.drawer}
      variant={isMediaSmDown ? 'temporary' : 'permanent'}
      open={isMediaSmDown ? open : true}
      onOpen={onOpen}
      onClose={onClose}
      classes={{
        paper: classes.drawer_paper,
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          <ListItem button key={0}>
            <ListItemIcon>
              <AddCircleOutline />
            </ListItemIcon>
            <ListItemText primary={'Add new journey'} />
          </ListItem>

          <ListItem button key={1}>
            <ListItemIcon>
              <Explore />
            </ListItemIcon>
            <ListItemText primary={'My journeys'} />
          </ListItem>
        </List>
      </div>
    </SwipeableDrawer>
  );
}

export default memo(AppDrawer);
