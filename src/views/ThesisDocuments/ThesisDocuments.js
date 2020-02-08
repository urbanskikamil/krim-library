import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import uuid from 'uuid/v1';
import moment from 'moment';

import { ThesisToolbar, ThesisTable } from './components';
import theme from '../../theme/index'
import axios from '../../axios-orders'

import DialogWindow from './components/DialogWindow/DialogWindow'
import DeleteDialog from './components/DeleteDialog/DeleteDialog'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class ThesisDocuments extends Component {
  state = {
    documentsData: [],
    dialogOpen: false,
    title: '',
    author: '',
    supervisor: '',
    documentType: '',
    contains: [],
    date: '',
    selectedRecords: [],
    deleteDialogOpen: false,
    snackBarAlertSuccess: false,
    severity: '',
    alertContent: '',
    loading: false
  }
  
  refreshData = () => {
    axios.get('/documents/thesis')
    .then(response => {
       this.setState({documentsData: response.data})
    }).then(console.log('Data refreshed'))
  }

  componentDidMount () {
    this.refreshData();
  }

  componentDidUpdate () {
    console.log('did update')
  }

  handleAddItem = () => {this.setState({dialogOpen: true})}

  handleDialogOpen = () => {this.setState({dialogOpen: true})}

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
      title: '',
      author: '',
      supervisor: '',
      documentType: '',
      contains: []
    })
  }
  handleTypeChange = (event) => {this.setState({documentType: event.target.value})}

  handleTitleChange = (event) => {this.setState({title: event.target.value})}

  handleAuthorChange = (event) => {this.setState({author: event.target.value})}
  
  handleSupervisorChange = (event) => {this.setState({supervisor: event.target.value})}

  handleContainsChange = (event) => {  
    let copiedContains = [...this.state.contains];
    copiedContains = event.target.value;
    this.setState({contains: copiedContains})
  }

  handleSubmit = () => {
    const { documentType, title, contains, author, supervisor } = this.state

    if (title === '' || author === '' || supervisor === '' || documentType === '' || contains === []) 
      this.setState({
        alertContent: 'Proszę wypełnić wszystkie pola',
        severity: 'warning', 
        snackBarAlertSuccess: true
      })
    else{
      this.setState({loading: true})

      axios.post('/documents/thesis', {
          id: uuid(),
          type: documentType,
          title: title,
          field: contains.join(', '),
          author: author,
          supervisor: supervisor,
          addedAt: moment()
      })
      .then(response => {
          console.log(response)
          setTimeout(() => this.setState({
            dialogOpen: false,
            loading: false,
            title: '',
            author: '',
            supervisor: '',
            documentType: '',
            contains: [],
          }), 2000)
          if (response.status < 200 || response.status > 299) {
            setTimeout(() => this.setState({
              alertContent: 'Wystąpił błąd podczas próby dodania dokumentu. Proszę spróbować jeszcze raz',
              severity: 'error', 
              snackBarAlertSuccess: true
            }), 2000)
          }
          else {
            setTimeout(() => this.setState({
              alertContent: 'Dokument został poprawnie dodany bo bazy danych!',
              severity: 'success', 
              snackBarAlertSuccess: true
            }), 2000)         
          }
        }
      )
      setTimeout(() => this.refreshData(), 1000)
    }
  }

  handleDeleteRecord = () => {
    let recordsId = [...this.state.selectedRecords] 
    this.setState({loading: true})

    recordsId.map(async record => {
      await axios.delete(`/documents/thesis/${record}`)
        .then(response => {
          console.log(response)
          if (response.status < 200 || response.status > 299) {
            this.setState({
              deleteDialogOpen: false,
              loading: false,
              alertContent: 'Wystąpił błąd podczas próby usunięcia dokumentu. Proszę spróbować jeszcze raz',
              severity: 'error',
              snackBarAlertSuccess: true
            })   
          }    
        })
    })

    setTimeout(() => this.setState({
      deleteDialogOpen: false,
      loading: false,
      alertContent: 'Dokument został poprawnie usunięty z bazy danych!',
      severity: 'success',
      snackBarAlertSuccess: true
    }), 2000)

    setTimeout(() => this.refreshData(), 1000)
  }

  handleFindRecordId = (records) => { this.setState({selectedRecords: records}) }

  handleDeleteDialogOpen = () => {
    console.log(this.state.selectedRecords)
    if(this.state.selectedRecords.length === 0) 
      this.setState({
        alertContent: 'Proszę wybrać dokument do usunięcia',
        severity: 'warning', 
        snackBarAlertSuccess: true        
      })
    else this.setState({deleteDialogOpen: true})
  }

  handleDeleteDialogClose = () => {this.setState({deleteDialogOpen: false})}

  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({snackBarAlertSuccess: false})}

  render(){
    return (
      <div style={{padding: theme.spacing(3)}}>
        <ThesisToolbar 
          clicked={this.handleAddItem}
          deleteDialogOpen={this.handleDeleteDialogOpen} />
        <div style={{marginTop: theme.spacing(2)}}>
          <ThesisTable 
            documentsData={this.state.documentsData}
            findSelected={(records) => this.handleFindRecordId(records)} 
          />
        </div>
        <DialogWindow
          author={this.state.author}
          authorChange={this.handleAuthorChange}
          closed={this.handleDialogClose}
          contains={this.state.contains}
          containsChange={(event) => this.handleContainsChange(event)}
          dialogStatus={this.state.dialogOpen}
          documentType={this.state.documentType}
          maxWidth={this.state.maxWidth}
          submited={this.handleSubmit}
          supervisor={this.state.supervisor}
          supervisorChange={this.handleSupervisorChange}
          title={this.state.title}
          titleChange={this.handleTitleChange}
          typeChange={(event) => this.handleTypeChange(event)}
          loading={this.state.loading}
        />
        <DeleteDialog 
          closed={this.handleDeleteDialogClose}
          dialogStatus={this.state.deleteDialogOpen}
          accepted={this.handleDeleteRecord}
          cancelled={this.handleDeleteDialogClose}
          loading={this.state.loading}
        />
        <Snackbar 
          open={this.state.snackBarAlertSuccess} 
          autoHideDuration={6000} 
          onClose={this.handleAlertClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={this.handleAlertClose} severity={this.state.severity}>
            {this.state.alertContent}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

export default ThesisDocuments;
