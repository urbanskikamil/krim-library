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
  Button
} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';


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


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  { type: 'Użytkownik autoryzowany', description: 'Użytkownik autoryzowany ma prawo do pobierania dokumentów' },
  { type: 'Edytor', description: 'Edytor ma prawo do pobierania dokumentów, dodawania nowych oraz usuwania tych dodanych przez siebie' },
  { type: 'Administrator', description: 'Administrator ma prawo do pobierania dokumentów, dodawania nowych, usuwania dokumentów oraz przyznawania dostępu innym użytkownikom' },
  // createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  // createData('Eclair', 262, 16.0, 24, 6.0),
  // createData('Cupcake', 305, 3.7, 67, 4.3),
  // createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Access = () => {
  const classes = useStyles();
  
  const handleChange = () => {
    
  }
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
                  {/* <FormControl className={classes.formControl}>
                    <Select
                      name="access"
                      type="select"
                      //value={formState.values.degree || ''}
                      //onChange={handleChange}
                    >
                      <MenuItem value={'Administrator'}>Administrator</MenuItem>
                      <MenuItem value={'Edytor'}>Edytor</MenuItem>
                      <MenuItem value={'Użytkownik autoryzowany'}>
                        Użytkownik autoryzowany
                      </MenuItem>
                      <MenuItem value={'Użytkownik nieautoryzowany'}>
                        Użytkownik nieautoryzowany
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                <TableCell className={classes.accessCell} align="left">
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<Icon>send</Icon>}
                    //onClick={}
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

export default Access