import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';

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
  Typography
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
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
  accessCell: {
    minWidth: '150px'
  }
}));

const rows = [
  { type: 'Użytkownik autoryzowany', description: 'Użytkownik autoryzowany ma prawo do pobierania dokumentów', accessLevel: 1 },
  { type: 'Edytor', description: 'Edytor ma prawo do pobierania dokumentów, dodawania nowych oraz usuwania tych dodanych przez siebie', accessLevel: 2 },
  { type: 'Administrator', description: 'Administrator ma prawo do pobierania dokumentów, dodawania nowych, usuwania dokumentów oraz przyznawania dostępu innym użytkownikom', accessLevel: 3 },
];

const session = JSON.parse(sessionStorage.getItem('session'))

const Access = (props) => {
  //const { history } = props;

  const classes = useStyles();
  const [user, setUser] = useState({})
  const [requestPending, setRequestPending] = useState(false)

  const handleRequest = (type, accessLevel) => {
    console.log('user', user)
    axios.post(`/requestAccess/${type}/${accessLevel}`, user)
    setRequestPending(true)
  }

  useEffect(() => {
    axios.get(`/requestAccess/check/${session.userEmail}`)
    .then(response => {
      setRequestPending(response.data.requestPending)
    })

    axios.get(`/login/getData/${session.userEmail}`)
    .then(response => {
      console.log('user', response.data)
      setUser(response.data)
    })
  }, [])

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
            {rows.map((row, index) => (
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
      </TableContainer>
    </div>
  );
}

export default withRouter(Access)