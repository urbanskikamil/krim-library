import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, Button, FormControl, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@material-ui/core'

import InputField from './components/inputField'
import TypeField from './components/TypeField'
import ContainField from './components/ContainField'

const DialogWindow = (props) => {
  const classes = useStyles();

  return(
    <Dialog 
      aria-labelledby="form-dialog-title"
      onClose={props.closed} 
      open={props.dialogStatus} 
    >
    {props.loading ? 
      <div className={classes.circularProgress}>
        <CircularProgress size={60}/>
      </div> 
      : <React.Fragment>
          <DialogTitle id="form-dialog-title">Dodaj plik</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Aby dodać plik proszę wypełnić ponizszy formularz 
              i kliknąć przycisk "Dodaj"
            </DialogContentText>
            <InputField 
              author={props.author}
              authorChange={props.authorChange}
              studiesClass={props.studiesClass}
              studiesClassChange={props.studiesClassChange} 
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
          <FormControl>
            <input
              className={classes.input}
              accept=".pdf,.doc,.docx,.jpg,.jpeg"
              id="file"
              name="file"
              type="file"
              onChange={e => props.handleFile(e.target.files[0],"file")}
            />
            <Button 
              color="primary"          
              onClick={props.submited}
            >Dodaj
            </Button>
            <Button
              color="primary"
              onClick={props.closed} 
            >Zamknij
            </Button>
            </FormControl>
        </React.Fragment>
    }
    </Dialog>
  )
} 

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
  circularProgress: {
    width: '338px',
    height: '158px',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    margin: '20px'
  },
}));

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
  class: PropTypes.string,
  classChange: PropTypes.func,
  title: PropTypes.string,
  titleChange: PropTypes.func,
  typeChange: PropTypes.func
};


export default DialogWindow