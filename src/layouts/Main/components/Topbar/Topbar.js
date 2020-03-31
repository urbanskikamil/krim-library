import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton, Tooltip } from '@material-ui/core';
import { Menu, Input } from '@material-ui/icons';
import axios from 'axios-orders'

const Topbar = props => {
  const { className, onSidebarOpen, disableLogout, disableLink, ...rest } = props;

  const classes = useStyles();

  const handleLogout = () => {
    axios.get('/login/logout')
    sessionStorage.removeItem('session')
  }

  const logo = (
    <div style={{display: 'flex', alignItems: 'center'}}>
      <img 
        alt="Logo"
        src="/images/logos/1-0.png"
        style={{maxWidth: '50px'}}
      />
      <div style={{display: 'inline', color: 'white', fontSize: '24px', marginLeft: '10px'}}>Biblioteka KRiM</div>
    </div>
  )
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Toolbar>
        { !disableLink ? 
          <RouterLink to="/" >
            {logo}
          </RouterLink>
          : logo 
        }
        <div className={classes.flexGrow} />
        { props.disableLogout ? null :
          <React.Fragment>
            <Hidden mdDown>
              <Tooltip title="Wyloguj">
                <RouterLink to="/sign-in" onClick={handleLogout}>
                  <IconButton
                    className={classes.signOutButton}
                    color="inherit"
                  >
                    <Input />
                  </IconButton>
                </RouterLink>
              </Tooltip>
            </Hidden>
            <Hidden lgUp>
              <IconButton
                color="inherit"
                onClick={onSidebarOpen}
              >
                <Menu />
              </IconButton>
            </Hidden>
          </React.Fragment>
        }
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
    color: 'white',
  },
}));

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
