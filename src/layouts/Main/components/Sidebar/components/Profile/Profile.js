import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import axios from 'axios-orders'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  typo: {
    marginTop: theme.spacing(1)
  }
}));

const accesses = [
  {level: 0, description: 'Użytkownik nieautoryzowany'},
  {level: 1, description: 'Użytkownik autoryzowany'},
  {level: 2, description: 'Edytor'},
  {level: 3, description: 'Administrator'},
]

const findDescription = (accessLevel) => {
  const accessRow = accesses.find(row => row.level === accessLevel)
  return accessRow.description
}

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const session = JSON.parse(sessionStorage.getItem('session'))
  console.log('session', session)

  const [user, setUser] = useState({})

  
  useEffect(() => {
    if (session) {
      axios.get(`/login/getData/${session.userEmail}`)
        .then(response => {
          console.log('user', response.data)
          setUser(response.data)
        })
    }
  }, [])
  

  const userData = {
    name: `${user.firstName} ${user.lastName}`,
    avatar: 'H',
    degree: user.degree,
    position: user.position,
    access: user.accessLevel
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      { user.firstName ?
        <React.Fragment>
          <Typography
            className={classes.name}
            variant="h4"
          >
            {userData.name}
          </Typography>
          <Typography variant="body2">{userData.degree}</Typography>
          <Typography variant="caption">{userData.position}</Typography>
          <Typography className={classes.typo} variant="caption">Poziom dostępu:</Typography>
          <Typography variant="caption">{findDescription(userData.access)}</Typography>
        </React.Fragment>
      : null}
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
