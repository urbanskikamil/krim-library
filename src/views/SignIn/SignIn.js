import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography,
  Dialog,
  Snackbar,
  CircularProgress,
} from '@material-ui/core';

import { Alert } from '../../UI'
import axios from '../../axios-orders'

const schema = {
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
      minimum: 6,
      maximum: 128
    }
  }
};

const SignIn = props => {
  const { history } = props;

  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState(null)

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false)
  }

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

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

  const handleSignIn = event => {
    event.preventDefault();

    setLoading(true)
    axios.post('/login/sign-in', formState.values)
      .then(response => {
        console.log('response',response)
        setLoading(false)
        if (response.data.emailAuthenticated) {
          if (response.data.validPassword) {
            //sessionStorage.setItem('session', response.data.session)
            sessionStorage.setItem('session', JSON.stringify(response.data.session))
            //console.log('session', sessionStorage.getItem('session.user.email'))
            return history.push('/');
          }
          setSnackBarOpen(true);
          return setSnackBarMessage(`Niepoprawne hasło dla użytkownika: ${formState.values.email}. Spróbuj ponownie`)
        }
        setSnackBarOpen(true)
        return setSnackBarMessage(`Błędny adres email. Spróbuj ponownie`)
      })
      .catch(err => console.log(err))
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.descriptionContainer} item lg={5}>
          <div className={classes.description}>
            <div className={classes.descriptionInner}>
              <Typography className={classes.descriptionText} variant="h1">
                Witaj na stronie biblioteki Katedry Robotyki i Mechatroniki AGH.
              </Typography>
              <div className={classes.instruction}>
                <Typography className={classes.instructionText} variant="body1">
                  Zaloguj się, aby kontynuować
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <div className={classes.contentBody}>
              <form className={classes.form} onSubmit={handleSignIn}>
                <Typography className={classes.title} variant="h2">
                  Zaloguj się
                </Typography>
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
                <Button
                  className={classes.signInButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Zaloguj
                </Button>
                <Typography color="textSecondary" variant="body1">
                  Nie masz jeszcze konta?{' '}
                  <Link component={RouterLink} to="/sign-up" variant="h6">
                    Zarejestruj się!
                  </Link>
                </Typography>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
      <Dialog open={loading} onClose={() => setLoading(false)}>
          <div className={classes.circularProgress}>
            <CircularProgress size={60}/> 
          </div>
        </Dialog> 
        <Snackbar 
          open={snackBarOpen} 
          autoHideDuration={6000} 
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          onClose={handleAlertClose}
        >
          <Alert onClose={handleAlertClose} severity='error'>
            {snackBarMessage}
          </Alert>
        </Snackbar>
    </div>
  );
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
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
  circularProgress: {
    width: '338px',
    height: '158px',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
