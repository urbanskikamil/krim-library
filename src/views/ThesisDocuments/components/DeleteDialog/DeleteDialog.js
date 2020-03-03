import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

const DeleteDialog = (props) => {
  const classes = useStyles();
  const { closed, dialogStatus, accepted, cancelled, loading } = props

  return(
    <Dialog
      aria-labelledby="form-dialog-title"
      className={classes.dialog} 
      onClose={closed} 
      open={dialogStatus} 
    >
      {loading ? 
        <div className={classes.circularProgress}>
          <CircularProgress size={60}/>
        </div>
        : <React.Fragment>
          <DialogTitle id="form-dialog-title">Usunąć pliki?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Czy napewno chcesz usunąć zaznaczone pliki?<br/>
              Operacji tej nie będzie mozna cofnąć
            </DialogContentText>
            <div className={classes.flexContainer}>
              <Button 
                color="primary" 
                onClick={accepted}>TAK</Button>
              <Button 
                color="primary" 
                onClick={cancelled}>NIE</Button>
            </div>
          </DialogContent>
        </React.Fragment>
      }
    </Dialog> 
  )
} 

const useStyles = makeStyles(theme => ({
  flexContainer: {
    display: 'flex', 
    justifyContent: 'center'
  },
  circularProgress: {
    width: '338px',
    height: '158px',
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center'
  },
}));

DeleteDialog.propTypes = {
  closed: PropTypes.func,
  dialogStatus: PropTypes.bool,
  accepted: PropTypes.func,
  cancelled: PropTypes.func,
  loading: PropTypes.bool
};


export default DeleteDialog