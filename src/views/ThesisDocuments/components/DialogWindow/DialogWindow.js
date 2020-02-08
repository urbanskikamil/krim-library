import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import InputField from './components/inputField'
import TypeField from './components/TypeField'
import ContainField from './components/ContainField'

const useStyles = makeStyles(theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
    width: '170px'
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

const DialogWindow = (props) => {
  const classes = useStyles();

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
        <InputField 
          author={props.author}
          authorChange={props.authorChange}
          supervisor={props.supervisor}
          supervisorChange={props.supervisorChange} 
          title={props.title}
          titleChange={props.titleChange}
        />
        <TypeField
          classes={classes}
          documentType={props.documentType}
          typeChange={props.typeChange} 
        />
        <ContainField
          classes={classes}
          contains={props.contains}
          containsChange={props.containsChange} 
        />
      </DialogContent>
      <DialogActions>
        <Button 
          color="primary"
          onClick={props.closed} 
        >Zamknij
        </Button>
        <Button 
          color="primary"          
          onClick={props.submited}
        >Dodaj
        </Button>
      </DialogActions>
    </Dialog>
  )
} 

DialogWindow.propTypes = {
  author: PropTypes.string,
  authorChange: PropTypes.func,
  closed: PropTypes.func,
  contains: PropTypes.array,
  containsChange: PropTypes.func,
  dialogStatus: PropTypes.bool,
  documentType: PropTypes.string,
  maxWidth: PropTypes.number,
  submited: PropTypes.func,
  supervisor: PropTypes.string,
  supervisorChange: PropTypes.func,
  title: PropTypes.string,
  titleChange: PropTypes.func,
  typeChange: PropTypes.func
};


export default DialogWindow