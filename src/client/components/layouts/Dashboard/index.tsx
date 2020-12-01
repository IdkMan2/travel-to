import {withProtectedAccess} from '@client/ad-hocs/withProtectedAccess';
import AppDrawer, {DRAWER_WIDTH} from '@client/components/molecules/AppDrawer';
import TopBar from '@client/components/molecules/TopBar';
import {ILayoutComponent} from '@client/interfaces/ILayout';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {memo, ReactNode, useCallback, useState} from 'react';

export interface IDashboardProps {
  children: ReactNode;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      flexFlow: 'column nowrap',
      padding: theme.spacing(2, 2),
      [theme.breakpoints.up('md')]: {
        left: DRAWER_WIDTH,
      },
    },
    appbarSpacer: theme.mixins.toolbar,
  })
);

function Dashboard(props: IDashboardProps) {
  const {children} = props;
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const onDrawerToggle = useCallback(() => setDrawerOpen(!drawerOpen), [setDrawerOpen, drawerOpen]);
  const onDrawerToggleByEvent = useCallback((event: React.KeyboardEvent | React.MouseEvent, open: boolean) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  }, []);
  const onDrawerOpen = useCallback((e) => onDrawerToggleByEvent(e, true), [onDrawerToggleByEvent]);
  const onDrawerClose = useCallback((e) => onDrawerToggleByEvent(e, false), [onDrawerToggleByEvent]);

  return (
    <>
      <TopBar title={'Your travels'} toggleDrawer={onDrawerToggle} />
      <AppDrawer open={drawerOpen} onOpen={onDrawerOpen} onClose={onDrawerClose} />
      <div className={classes.root}>
        <div className={classes.appbarSpacer} />
        {children}
      </div>
    </>
  );
}

export default withProtectedAccess(memo(Dashboard)) as ILayoutComponent<IDashboardProps>;
