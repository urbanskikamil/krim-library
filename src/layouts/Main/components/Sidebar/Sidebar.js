import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import {
  People,
  Work,
  School,
  MenuBook,
  LibraryBooks,
  Person,
  LockOpen,
  ExitToApp
} from '@material-ui/icons'

import { Profile, SidebarNav } from './components';

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Prace dyplomowe',
      href: '/documents/thesis',
      icon: <School />
    },
    {
      title: 'Prace studentów',
      href: '/documents/students',
      icon: <People />
    },
    {
      title: 'Publikacje naukowe',
      href: '/documents/publications',
      icon: <MenuBook />
    },   
    {
      title: 'Pomoce dydaktyczne',
      href: '/documents/didactics',
      icon: <Work />
    },
    {
      title: 'Materiały zewnętrzne',
      href: '/documents/external',
      icon: <LibraryBooks />
    }, 
    {
      title: 'Uzyskaj dostęp',
      href: '/access',
      icon: <LockOpen />
    }, 
    {
      title: 'Panel administratora',
      href: '/admin',
      icon: <Person />
    }, 
    {
      title: 'Wyloguj',
      href: '/sign-in',
      icon: <ExitToApp />
    }, 
  ];

  

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
