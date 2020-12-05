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
      position: 'relative',
      display: 'flex',
      flexFlow: 'column nowrap',
      left: 0,
      width: '100%',
      minHeight: '100vh',
      paddingTop: (theme.mixins.toolbar.minHeight as number) + theme.spacing(2),
      paddingBottom: theme.spacing(4),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        left: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
        paddingTop: (theme.mixins.toolbar.minHeight as number) + theme.spacing(4),
        paddingBottom: theme.spacing(8),
        paddingLeft: theme.spacing(4),
        paddingRight: theme.spacing(4),
      },
    },
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
      <div className={classes.root}>{children}</div>
    </>
  );
}

export default withProtectedAccess(memo(Dashboard)) as ILayoutComponent<IDashboardProps>;
