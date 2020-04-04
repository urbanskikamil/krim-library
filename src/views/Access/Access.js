/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

import { Alert } from '../../UI'
import {
  Button,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Snackbar,
  CircularProgress
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import axios from 'axios-orders'

const rows = [
  { type: 'Użytkownik autoryzowany', description: 'Użytkownik autoryzowany ma prawo do pobierania dokumentów', accessLevel: 1 },
  { type: 'Edytor', description: 'Edytor ma prawo do pobierania dokumentów, dodawania nowych oraz usuwania tych dodanych przez siebie', accessLevel: 2 },
  { type: 'Administrator', description: 'Administrator ma prawo do pobierania dokumentów, dodawania nowych, usuwania dokumentów oraz przyznawania dostępu innym użytkownikom', accessLevel: 3 },
];

const Access = (props) => {

  const classes = useStyles();
  const session = JSON.parse(sessionStorage.getItem('session'))
  const [user, setUser] = useState({})
  const [requestPending, setRequestPending] = useState(false)
  const [snackbarAlert, setSnackbarAlert] = useState(false)
  const [snackBarMessage, setSnackBarMessage] = useState(null)
  const [requestType, setRequestType] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleRequest = (type, accessLevel) => {
    console.log('user', user)

    axios.post(`/requestAccess/request/${type}/${accessLevel}`, user)
      .then(result => {
        setSnackbarAlert(true)
        setSnackBarMessage('Prośba o uzyskanie dostępu została wysłana, aktualnie oczekuje na akceptację Administratora')
        setRequestPending(true)
      })
  }

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarAlert(false)
  }

  const handleGetRequest = () => {
    if (session) {
      axios.get(`/requestAccess/check/${session.userEmail}`)
      .then(response => {
        setRequestType(response.data.requestType)
        setRequestPending(response.data.requestPending)
      })

      axios.get(`/login/getData/${session.userEmail}`)
      .then(response => {
        setUser(response.data)
        setLoading(false)
      })
    }
  }

  useEffect(() => {
    setLoading(true)
    handleGetRequest();
  }, [requestPending])

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h3">
          Prośba o uzyskanie dostępu
        </Typography>
      </Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Typ dostępu</TableCell>
              <TableCell align="left">Uprawnienia</TableCell>
              <TableCell align="left">Poproś o dostęp</TableCell>
            </TableRow>
          </TableHead>
         <TableBody>
          {loading ? null
            : rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left" component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell className={classes.accessCell} align="left">
                  <Button
                    size="small"
                    disabled={row.accessLevel <= user.accessLevel ? true : requestPending ? true : false }
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    onClick={() => handleRequest(row.type, row.accessLevel)}
                  >
                    Wyślij
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        { loading  ? 
          <div className={classes.circularProgress}>
            <CircularProgress size={40}/> 
          </div>
        : null }
      </TableContainer>
      <Paper className={classes.sentRequest}>
        <Typography className={classes.title} variant="h3">
          Wysłane prośby
        </Typography>
      </Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Typ dostępu</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          { requestType !== null && !loading ? 
            <TableRow>
              <TableCell align="left" component="th" scope="row">
                {requestType}
              </TableCell>
              <TableCell align="left">Oczekuje na akceptację Administratora</TableCell>
            </TableRow> 
          : null }
          </TableBody>
        </Table>
        { loading  ? 
          <div className={classes.circularProgress}>
            <CircularProgress size={40}/> 
          </div>
        : null }
        { requestType === null && !loading ? 
          <Typography className={classes.noRequests} variant="h4">
              Aktualnie nie masz żadnych oczekujących próśb o uzyskanie dostępu.
          </Typography>
          : null
        } 
      </TableContainer>
      <Snackbar 
        open={snackbarAlert} 
        autoHideDuration={6000} 
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity='success'>
          {snackBarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
  container: {
    padding: '2%'
  },
  paper: {
    padding: '2%'
  },
  sentRequest: {
    padding: '2%',
    marginTop: '2%'
  },
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    minWidth: 120,
  },
  accessCell: {
    minWidth: '150px'
  },
  noRequests: {
    width: '100%',
    textAlign: 'center',
    padding: '5%',
  },
  circularProgress: {
    width: '100%',
    height: '98px',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default withRouter(Access)