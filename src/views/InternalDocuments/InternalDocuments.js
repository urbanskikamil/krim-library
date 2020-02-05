import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/styles';
import uuid from 'uuid/v1';
import moment from 'moment';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import theme from '../../theme/index'
import axios from '../../axios-orders'

import DialogWindow from './components/DialogWindow/DialogWindow'

class InternalDocuments extends Component {
  state = {
    documentsData: [],
    dialogOpen: false,
    title: '',
    author: '',
    supervisor: '',
    documentType: '',
    contains: [],
    date: '',
    data: []

  }

  componentDidMount () {
    axios.get('/thesis')
    .then( async response => {
      // console.log(response)
      await this.setState({documentsData: response.data})
    })
  }

  // componentDidUpdate () {
  //   axios.get('/thesis')
  //   .then( async response => {
  //     // console.log(response)
  //     await this.setState({documentsData: response.data})
  //   })
  // }

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
      alert('Proszę wypełnić wszystkie pola')
    else{
      axios.post('/thesis', 
        {
          id: uuid(),
          type: documentType,
          title: title,
          field: contains.join(', '),
          author: author,
          supervisor: supervisor,
          addedAt: moment()
        }
      )
      this.setState({
        dialogOpen: false, 
        title: '',
        author: '',
        supervisor: '',
        documentType: '',
        contains: [],
      })
    }
  }

  render(){
    return (
      <div style={{padding: theme.spacing(3)}}>
        <UsersToolbar clicked={this.handleAddItem} />
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable documentsData={this.state.documentsData} />
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
        />
      </div>
    );
  }
}

export default InternalDocuments;
