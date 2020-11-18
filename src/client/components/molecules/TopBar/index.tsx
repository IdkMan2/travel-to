import ProfileMenu from '@client/components/molecules/ProfileMenu';
import {Theme} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import {createStyles} from '@material-ui/styles';
import NextLink from 'next/link';
import React, {memo} from 'react';

export interface ITopBarProps {
  title: string;
  toggleDrawer: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.primary.dark,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    middleSpacer: {
      flex: 1,
    },
    menuIcon_root: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
      },
    },
  })
);

function TopBar(props: ITopBarProps) {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const {title, toggleDrawer} = props;

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar position={'fixed'} className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <NextLink href={'/home'} passHref>
            <Link variant={'h6'} noWrap color={'inherit'}>
              {title}
            </Link>
          </NextLink>
          <div className={classes.middleSpacer} />
          <IconButton
            aria-label={'account of current user'}
            aria-controls={'menu-appbar'}
            aria-haspopup={'true'}
            onClick={handleMenuClick}
            color={'inherit'}
            classes={{
              root: classes.menuIcon_root,
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <ProfileMenu anchorEl={menuAnchorEl} handleClose={handleMenuClose} />
    </>
  );
}

export default memo(TopBar);
