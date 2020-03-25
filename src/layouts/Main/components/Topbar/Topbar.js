import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

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

const Topbar = props => {
  const { className, onSidebarOpen, disableLogout, disableLink, ...rest } = props;

  const classes = useStyles();

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
              <RouterLink to="/sign-in">
                <IconButton
                  className={classes.signOutButton}
                  color="inherit"
                >
                  <InputIcon />
                </IconButton>
              </RouterLink>
            </Hidden>
            <Hidden lgUp>
              <IconButton
                color="inherit"
                onClick={onSidebarOpen}
              >
                <MenuIcon />
              </IconButton>
            </Hidden>
          </React.Fragment>
        }
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
};

export default Topbar;
