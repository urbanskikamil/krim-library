import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from '../../axios-orders'

import { Alert } from '../../UI'
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Typography,
  CircularProgress,
  Dialog,
  Snackbar
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { SettingsBrightnessOutlined } from '@material-ui/icons';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: '- pole wymagane' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: '- pole wymagane' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: '- pole wymagane' },
    email: true,
    length: {
      maximum: 64
    }
  },
  password: {
    presence: { allowEmpty: false, message: '- pole wymagane' },
    length: {
      maximum: 128
    }
  },
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  descriptionContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  description: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/architect2.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  descriptionInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  descriptionText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  instructionText: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  },
  circularProgress: {
    width: '338px',
    height: '158px',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  successMessage: {
    padding: '30px', 
    textAlign: 'center'
  },
  redirectMessage: {
    marginTop: '20px'
  }
}));

const SignUp = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  const [loading, setLoading] = useState(false)
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [signed, setSigned] = useState(false)

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false)
  }

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleBack = () => {
    history.push('/sign-in')
  };

  const handleSignUp = event => {
    event.preventDefault();

    setLoading(true)
      axios.post('/login/sign-up', formState.values)
      .then(response => {
        const emailExist = response.data.emailExist
        if (emailExist) {
          setLoading(false)
          setSnackBarOpen(true)
        }
        else {
          setSigned(true)
          setTimeout(() => history.push('/sign-in'), 5000)
        }
      })
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.description}>
            <div className={classes.descriptionInner}>
              <Typography className={classes.descriptionText} variant="h1">
                Zarejestruj się, aby korzystać z Biblioteki Katedry Robotyki i Mechatroniki.
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignUp}>
                <Typography className={classes.title} variant="h2">
                  Zarejestruj się
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('firstName')}
                  fullWidth
                  helperText={
                    hasError('firstName') ? formState.errors.firstName[0] : null
                  }
                  label="Imię"
                  name="firstName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.firstName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('lastName')}
                  fullWidth
                  helperText={
                    hasError('lastName') ? formState.errors.lastName[0] : null
                  }
                  label="Nazwisko"
                  name="lastName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.lastName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Adres email"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Hasło"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )}
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Zarejestruj
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Masz już konto?{' '}
                  <Link
                    component={RouterLink}
                    to="/sign-in"
                    variant="h6"
                  >
                    Zaloguj się!
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
        <Dialog open={loading} onClose={() => setLoading(false)}>
          <div className={classes.circularProgress}>
            { signed ? 
                <div className={classes.successMessage}>
                  <Typography color="textSecondary" variant="body1">
                    Gratulacje! Konto zostało założone.
                  </Typography> 
                  <Typography className={classes.redirectMessage} color="textSecondary" variant="body2">
                    Za moment zostaniesz przekierowany na stronę logowania'                  
                  </Typography> 
                </div>
              : <CircularProgress size={60}/> 
            }            
          </div>
        </Dialog> 
        <Snackbar 
          open={snackBarOpen} 
          autoHideDuration={6000} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity='error'>
            Podany adres email już istnieje! Proszę użyć innego adresu
          </Alert>
        </Snackbar>
    </div>
  );
};

SignUp.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignUp);
