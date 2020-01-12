import React, {  } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const dialogWindow = (props) => {

  // const useStyles = makeStyles(theme => ({
  //   form: {
  //     display: 'flex',
  //     flexDirection: 'column',
  //     margin: 'auto',
  //     width: 'fit-content',
  //   },
  //   formControl: {
  //     marginTop: theme.spacing(2),
  //     minWidth: 120,
  //   },
  //   formControlLabel: {
  //     marginTop: theme.spacing(1),
  //   },
  // }));

  // const classes = useStyles();

  return(
    <Dialog 
      aria-labelledby="form-dialog-title"
      onClose={props.closed} 
      open={props.dialogStatus} 
    >
      <DialogTitle id="form-dialog-title">Dodaj plik</DialogTitle>
      <DialogContent>
        <DialogContentText>
           Aby dodać plik proszę wypełnić ponizszy formularz 
           i kliknąć przycisk "Dodaj"
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
        <form  noValidate>
          <FormControl style={{width: '170px'}}>
            <InputLabel htmlFor="document-type">Typ dokumentu</InputLabel>
            <Select
              autoFocus
              value={props.maxWidth}
              onChange={props.widthChange}  
              inputProps={{
                name: 'document-type',
                id: 'document-type',
              }}
            >
              <MenuItem value="master-thesis">Praca magisterska</MenuItem>
              <MenuItem value="bachelor-thesis">Praca inzynierska</MenuItem>
              <MenuItem value="doctorate">Praca doktorska</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closed} color="primary">
           Zamknij
        </Button>
        <Button onClick={props.closed} color="primary">
           Dodaj
        </Button>
      </DialogActions>
    </Dialog>
  )
} 

dialogWindow.propTypes = {
  closed: PropTypes.func,
  dialogStatus: PropTypes.bool,
  maxWidth: PropTypes.number,
  opened: PropTypes.func,
};


export default dialogWindow