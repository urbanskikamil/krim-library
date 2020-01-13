import React, { Component } from 'react';
import { makeStyles } from '@material-ui/styles';
import uuid from 'uuid/v1';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';
import theme from '../../theme/index'

import DialogWindow from './components/DialogWindow/DialogWindow'
class InternalDocuments extends Component {
  state = {
    documentsData: mockData,
    dialogOpen: false,
    documentType: '',
    contains: []
  }

  componentDidUpdate = () => {
    console.log(this.state.documentType, this.state.contains)
  }

  handleAddItem = () => {

    console.log(this.state.documentsData)

    //const clonedDocumentsData = [...this.state.documentsData]

    // clonedDocumentsData.push({
    //   id: uuid(),
    //   type: 'Praca magisterska',
    //   title: 'System wizyjny do analizy sytuacji drogowej',
    //   field: 'informatyka, systemy wizyjne',
    //   author: 'Kamil Urbanski',
    //   supervisor: 'dr. inz Piotr Kurowski',
    //   addedAt: 1555016400000
    // })

    this.setState({dialogOpen: true})

  }

  handleDialogOpen = () => {this.setState({dialogOpen: true})}

  handleDialogClose = () => {this.setState({dialogOpen: false})}
  //classes = useStyles();
  handleTypeChange = (event) => {this.setState({documentType: event.target.value})}

  handleContainsChange = (event) => {  
    let copiedContains = [...this.state.contains];
    copiedContains = event.target.value;
    this.setState({contains: copiedContains})
  }
  handleSubmit = () => {
    const clonedDocumentsData = [...this.state.documentsData]

    clonedDocumentsData.push({
      id: uuid(),
      type: this.state.documentType,
      title: 'System wizyjny do analizy sytuacji drogowej',
      field: this.state.contains,
      author: 'Kamil Urbanski',
      supervisor: 'dr. inz Piotr Kurowski',
      addedAt: 1555016400000
    })

    this.setState({dialogOpen: false, documentsData: clonedDocumentsData})

  }

  render(){
    return (
      <div style={{padding: theme.spacing(3)}}>
        <UsersToolbar clicked={this.handleAddItem} />
        <div style={{marginTop: theme.spacing(2)}}>
          <UsersTable documentsData={this.state.documentsData} />
        </div>
        <DialogWindow
          closed={this.handleDialogClose}
          dialogStatus={this.state.dialogOpen}
          maxWidth={this.state.maxWidth}
          opened={this.handleDialogOpen}
          typeChange={(event) => this.handleTypeChange(event)}
          documentType={this.state.documentType}
          containsChange={(event) => this.handleContainsChange(event)}
          contains={this.state.contains}
          submited={this.handleSubmit}
        />
      </div>
    );
  }
}

export default InternalDocuments;
