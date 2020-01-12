import React, { Component } from 'react';
//import { makeStyles } from '@material-ui/styles';
import uuid from 'uuid/v1';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

import DialogWindow from './components/DialogWindow/DialogWindow'

// const useStyles = makeStyles(theme => ({
//   root: {
//     padding: theme.spacing(3)
//   },
//   content: {
//     marginTop: theme.spacing(2)
//   }
// }));

// const handleAddItem = () => {
//   alert('lol');
//   const [documentsData] = useState(mockData);
// }

class InternalDocuments extends Component {
  state = {
    documentsData: mockData,
    dialogOpen: false,
    maxWidth: 0,
  }

  handleAddItem = () => {

    const clonedDocumentsData = [...this.state.documentsData]

  
    clonedDocumentsData.push({
      id: uuid(),
      type: 'Praca magisterska',
      title: 'System wizyjny do analizy sytuacji drogowej',
      field: 'informatyka, systemy wizyjne',
      author: 'Kamil Urbanski',
      supervisor: 'dr. inz Piotr Kurowski',
      addedAt: 1555016400000
    })

    this.setState({documentsData: clonedDocumentsData, dialogOpen: true})

  }

  handleDialogOpen = () => {this.setState({dialogOpen: true})}

  handleDialogClose = () => {this.setState({dialogOpen: false})}
  //classes = useStyles();
  handleMaxWidthChange = (event) => {this.setState({maxWidth: event.target.value})}
  render(){
    //const classes = useStyles();

    return (
      <div>
        <UsersToolbar clicked={this.handleAddItem} />
        <div>
          <UsersTable documentsData={this.state.documentsData} />
        </div>
        <DialogWindow
          closed={this.handleDialogClose}
          dialogStatus={this.state.dialogOpen}
          maxWidth={this.state.maxWidth}
          opened={this.handleDialogOpen}
          widthChange={(event) => this.handleMaxWidthChange(event)}
        />
      </div>
    );
  }
}

export default InternalDocuments;
