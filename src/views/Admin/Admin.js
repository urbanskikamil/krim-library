import React, { useEffect, useState } from 'react';
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
  Icon
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import axios from 'axios-orders'


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
  formControl: {
    margin: theme.spacing(1),
    marginLeft: 0,
    minWidth: 120,
  },
  noRequests: {
    width: '100%',
    textAlign: 'center',
    padding: '5%',
  }
}));


const Admin = () => {
  const classes = useStyles();
  const [requests, setRequests] = useState([])

  const refreshData = () => {
    console.log('weszlo')
    axios.get('/requestAccess')
      .then(response => {
        console.log('requests', response.data)
        setRequests(response.data)
      })
  }

  useEffect(() => refreshData(), [])

  const handleDeleteRequest = (email) => {
    axios.post(`/requestAccess/delete/${email}`)
    refreshData();
  }

  const handleAcceptRequest = (email, requestedAccess, accessLevel) => {
    axios.post(`/requestAccess/accept/${email}/${requestedAccess}/${accessLevel}`)
    setTimeout(refreshData, 2000)
  }

  return (
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <Typography className={classes.title} variant="h3">
          Prośby o uzyskanie dostępu
        </Typography>
      </Paper>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Stanowisko</TableCell>
              <TableCell align="left">Stopień naukowy</TableCell>
              <TableCell align="left">Imię</TableCell>
              <TableCell align="left">Nazwisko</TableCell>
              <TableCell align="left">E-mail</TableCell>
              <TableCell align="left">Poziom dostępu</TableCell>
              <TableCell align="left">Zaakceptuj dostęp</TableCell>
              <TableCell align="left">Odrzuć dostęp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { requests.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="left" component="th" scope="row">
                  {row.position}
                </TableCell>
                <TableCell align="left">{row.degree}</TableCell>
                <TableCell align="left">{row.firstName}</TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.requestedAccess}</TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    onClick={() => handleAcceptRequest(row.email, row.requestedAccess, row.accessLevel)}
                  >
                    Potwierdź
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    style={{backgroundColor: 'red', color: 'white'}}
                    variant="contained"
                    className={classes.button}
                    startIcon={<Delete />}
                    onClick={() => handleDeleteRequest(row.email)}
                    dummy={requests}
                  >
                    Odrzuć
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {requests.length === 0 ? 
              <Typography className={classes.noRequests} variant="h4">
                  Nie ma aktualnie żadnych próśb o uzyskanie dostępu.
              </Typography>
              : null
        } 
      </TableContainer>
    </div>
  );
}

export default Admin