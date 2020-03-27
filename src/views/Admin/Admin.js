import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {
  Select,
  MenuItem,
  FormControl,
  Button,
  Icon
} from '@material-ui/core';
import { Delete } from '@material-ui/icons';


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
}));


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  { position: 'Kierownik katedry', degree: 'Profesor', firstName: 'Kamil', lastName: 'Urbanski', email: 'kamil@agh.pl', access: 'Administrator' },
  { position: 'Zastępca kierownika katedry', degree: 'Profesor', firstName: 'Piotr', lastName: 'Kurowski', email: 'kamil@agh.pl', access: 'Edytor' },
  { position: 'Kierownik katedry', degree: 'Profesor', firstName: 'Krzysztof', lastName: 'Mendrok', email: 'kamil@agh.pl', access: 'Uzytkownik autoryzowany' },
  { position: 'Doktorant', degree: 'Profesor', firstName: 'Kamil', lastName: 'Urbanski', email: 'kamil@agh.pl', access: 'Uzytkownik nieautoryzowany' },
];

const Admin = () => {
  const classes = useStyles();
  
  const handleChange = () => {
    
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
            {rows.map((row, index) => (
              <TableRow key={row.index}>
                <TableCell align="left" component="th" scope="row">
                  {row.position}
                </TableCell>
                <TableCell align="left">{row.degree}</TableCell>
                <TableCell align="left">{row.firstName}</TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.access}</TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    //onClick={}
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
                  >
                    Odrzuć
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

export default Admin