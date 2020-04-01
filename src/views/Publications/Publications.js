/* eslint-disable react/jsx-sort-props */
import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

import uuid from 'uuid/v1';
import moment from 'moment';

import { Toolbar, DocumentsTable } from '../../layouts/Main/components'
import { Alert, DeleteDialog, DialogWindow } from '../../UI'
import theme from '../../theme/index'
import axios from '../../axios-orders'

const categories = [
  {label: 'Typ', key: 'type'},
  {label: 'Nazwa', key: 'title'},
  {label: 'Dotyczy', key: 'field'},
  {label: 'Autor', key: 'author'},
]

const types = [
  {value: 'Publikacja'},
]

const session = JSON.parse(sessionStorage.getItem('session'))
class Publications extends Component {
  state = {
    documentsData: [],
    filteredData: [],
    dialogOpen: false,
    title: '',
    author: '',
    documentType: '',
    contains: [],
    date: '',
    selectedRecords: [],
    deleteDialogOpen: false,
    snackBarAlertSuccess: false,
    severity: '',
    alertContent: '',
    loading: false,
    file: '',
    category: '',
    searchInputValue: '',
    filtered: false,
    filterRequests: [],
    showNothing: false,
    loadingData: false,
    user: null,
  }
  
  fields = [
    {id: 'title', label: 'Tytuł dokumentu', change: 'handleTitleChange'},
    {id: 'author', label: 'Autor',change: 'handleAuthorChange'},
  ]

  refreshData = () => {
    this.setState({ loadingData: true })

    axios.get('/documents/publications')
      .then(response => {
        this.setState({loadingData: false, documentsData: response.data})})
      .then(console.log('Data refreshed'))
      .catch(error => {
        console.log('error', error)
      })
  }

  componentDidMount () {
    this.refreshData();
    axios.get(`/login/getData/${session.userEmail}`)
      .then(response => {
        this.setState({ user: response.data })
      })
  }

  handleAddItem = () => {
    if (this.state.user.accessLevel === 3 || this.state.user.accessLevel === 2) {
      return this.setState({dialogOpen: true})
    }
    return this.setState({
      alertContent: 'Nie masz uprawnień do dodawania plików. Aby uzyskać dostęp poproś o niego w zakładce "Uzyskaj dostęp"',
      severity: 'error', 
      snackBarAlertSuccess: true,
    })    
  }

  handleDialogOpen = () => {this.setState({ dialogOpen: true })}

  handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
      title: '',
      author: '',
      documentType: '',
      contains: [],
      file: ''
    })
  }
  handleTypeChange = (event) => {this.setState({documentType: event.target.value})}

  handleTitleChange = (event) => {this.setState({title: event.target.value})}

  handleAuthorChange = (event) => {this.setState({author: event.target.value})}
  
  handleContainsChange = (event) => {  
    let copiedContains = [...this.state.contains];
    copiedContains = event.target.value;
    this.setState({contains: copiedContains})
  }

  handleSubmit = (event) => {
    this.uploadFiles()
    
    const { documentType, title, contains, author, studiesClass, file } = this.state

      if (title === '' || author === '' || studiesClass === '' || documentType === '' || contains === [] || file === '') 
        this.setState({
          alertContent: 'Proszę wypełnić wszystkie pola',
          severity: 'warning', 
          snackBarAlertSuccess: true
        })
      else{
        this.setState({loading: true})
  
        axios.post('/documents/publications', {
          id: uuid(),
          type: documentType,
          title: title,
          field: contains.join(', '),
          author: author,
          addedAt: moment(),
          file: file.name
        })
          .then(response => {
            console.log(response)
            setTimeout(() => this.setState({
              dialogOpen: false,
              loading: false,
              title: '',
              author: '',
              documentType: '',
              contains: [],
              file: ''
            }), 2000)
            if (response.status < 200 || response.status > 299) {
              this.setState({
                alertContent: 'Wystąpił błąd podczas próby dodania dokumentu. Proszę spróbować jeszcze raz',
                severity: 'error', 
                snackBarAlertSuccess: true
              })
            }
            else {
              this.setState({
                alertContent: 'Dokument został poprawnie dodany bo bazy danych!',
                severity: 'success', 
                snackBarAlertSuccess: true
              })         
            }
            this.refreshData();
          })
          .catch((err) => {
            if(err.message === 'Network Error') {
              this.setState({
                dialogOpen: false,
                loading: false,
                title: '',
                author: '',
                documentType: '',
                contains: [],
                file: '',
                alertContent: 'Wystąpił problem z siecią, proszę spróbować ponownie',
                severity: 'error', 
                snackBarAlertSuccess: true
              })   
            } 
          })
      }
  }

  deleteRecord = () => {
    let recordsId = [...this.state.selectedRecords] 

    recordsId.map(record => {
      axios.get(`/documents/thesis/${record}`)
      axios.delete(`/documents/thesis/${record}`)
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
          else {
            this.setState({
              deleteDialogOpen: false,
              loading: false,
              alertContent: 'Dokument został poprawnie usunięty z bazy danych!',
              severity: 'success',
              snackBarAlertSuccess: true
            })
          }
          this.refreshData();   
        })
      return null
    })
  }

  handleDeleteRecord = () => {
    this.setState({loading: true})

    if (this.state.user.accessLevel === 3) {
      return this.deleteRecord();
    }
    else if (this.state.user.accessLevel === 2) {
      const fullName = `${this.state.user.firstName} ${this.state.user.lastName}`
      if (fullName === this.state.selectedDocAuthor) {
        return this.deleteRecord();
      }
      return this.setState({
        deleteDialogOpen: false,
        loading: false,
        alertContent: 'Nie masz uprawnień do usunięcia tego pliku. Aby uzyskać dostęp poproś o niego w zakładce "Uzyskaj dostęp"',
        severity: 'error', 
        snackBarAlertSuccess: true,
      })     
    }
    else {
      return this.setState({
        deleteDialogOpen: false,
        loading: false,
        alertContent: 'Nie masz uprawnień do usunięcia tego pliku. Aby uzyskać dostęp poproś o niego w zakładce "Uzyskaj dostęp"',
        severity: 'error', 
        snackBarAlertSuccess: true,
      })  
    }
  }

  handleFileDownload = (file) => { 
    if (session) {
      if (this.state.user.accessLevel === 0) {
        return this.setState({
          alertContent: 'Nie masz uprawnień do pobrania tego pliku. Aby uzyskać dostęp poproś o niego w zakładce "Uzyskaj dostęp"',
          severity: 'error', 
          snackBarAlertSuccess: true
        })
      }
      else return window.open(`http://localhost:8080/documents/thesis/download/${file}`, '_blank'); 
    }
  }

  handleFindRecordId = (records, author) => { 
    this.setState({selectedRecords: records, selectedDocAuthor: author}) 
  }

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

  handleDeleteDialogClose = () => { this.setState({deleteDialogOpen: false}) }

  handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({snackBarAlertSuccess: false})}

  handleFile = (fileName, id) => {
    this.setState({ [id]: fileName });
    console.log(this.state[id])
  }

  uploadFiles = () => {
    const data = new FormData();
    data.append('file', this.state.file);

    axios.put('/documents/publications/upload/', data)
      .then(response => console.log(response))
      .catch(err => console.log(err))
  };

  handleCategoryChange = (event) => { this.setState({category: event.target.value}) }

  handleSearch = () => {
    this.refreshData();

    if (this.state.searchInputValue === '' && this.state.category === '') {
      this.setState({
        filteredData: [],
        alertContent: 'Proszę wpisać frazę do wyszukania oraz wybrać kategorię',
        severity: 'warning', 
        snackBarAlertSuccess: true
      })
      return
    } 
    if (this.state.category === '') {    
      this.setState({
        alertContent: 'Proszę wybrać kategorię wyszukiwania',
        severity: 'warning', 
        snackBarAlertSuccess: true
      })
      return
    }
    if (this.state.searchInputValue === '') {    
      this.setState({
        alertContent: 'Proszę wpisać frazę do wyszukania',
        severity: 'warning', 
        snackBarAlertSuccess: true
      })
      return
    }

    const newData = []
    let copiedData = []

    if (this.state.filteredData.length < 1) copiedData = [...this.state.documentsData]
    else copiedData = [...this.state.filteredData]

    copiedData.map(record => {
      const chosenCategory = record[this.state.category].toLowerCase()
      const searchValue = this.state.searchInputValue.toLowerCase()

      if (chosenCategory.includes(searchValue)) { newData.push(record) }
      return null
    })
    const copiedFilters = [...this.state.filterRequests]
    copiedFilters.push({category: this.state.category, searchInput: this.state.searchInputValue})
    this.setState({ filteredData: newData, filtered: true, filterRequests: copiedFilters })
    if(newData.length < 1) this.setState({showNothing: true})
    else this.setState({showNothing: false})
  }

  handleInputChange = (event) => { this.setState({ searchInputValue: event.target.value }) }

  handleDeleteFilter = (id) => { 
    const newData = [];
    let copiedFilteredRequests = [...this.state.filterRequests]
    copiedFilteredRequests.splice(id, 1)
    
    this.setState({ filterRequests: copiedFilteredRequests, filteredData: [] })

    if(copiedFilteredRequests.length < 1) {
      this.setState({ showNothing: false, filtered: false }) 
      this.refreshData(); 
    }
    else {
      let copiedData = [...this.state.documentsData]
      copiedFilteredRequests.map(filter => {
        return copiedData.map(record => {
          const chosenCategory = record[filter.category].toLowerCase()
          const searchValue = filter.searchInput.toLowerCase()
          if (chosenCategory.includes(searchValue) && !newData.some(e => e.id === record.id)) {
            newData.push(record)
          }
          return null
        })
      })
      this.setState({showNothing: false, filteredData: newData })
    }
  }

  render(){
    return (
      <div style={{padding: theme.spacing(3)}}>
        <Toolbar 
          clicked={this.handleAddItem}
          deleteDialogOpen={this.handleDeleteDialogOpen}
          category={this.state.category}
          filtered={this.state.filtered}
          filterRequests={this.state.filterRequests}
          categories={categories}
          inputValue={this.state.searchInputValue}
          handleCategory={this.handleCategoryChange}
          handleSearch={this.handleSearch}
          handleInput={this.handleInputChange}
          handleDeleteFilter={this.handleDeleteFilter}
        />
        <div style={{marginTop: theme.spacing(2)}}>          
          <DocumentsTable 
            documentsData={this.state.showNothing === false ? this.state.filteredData.length < 1 ? this.state.documentsData 
              : this.state.filteredData : []}
            findSelected={this.handleFindRecordId}            
            fileDownload={this.handleFileDownload} 
            categories={categories}
            loadingData={this.state.loadingData}
          />
        </div>
        <DialogWindow
          closed={this.handleDialogClose}
          contains={this.state.contains}
          containsChange={this.handleContainsChange}
          dialogStatus={this.state.dialogOpen}
          documentType={this.state.documentType}
          maxWidth={this.state.maxWidth}
          submited={(event) => this.handleSubmit(event)}
          typeChange={(event) => this.handleTypeChange(event)}
          loading={this.state.loading}
          chosed={event => this.handleFileChosed(event)}
          handleFile={this.handleFile}
          fields={this.fields}
          types={types}
          title={this.state.title}
          titleChange={this.handleTitleChange}
          author={this.state.author}
          authorChange={this.handleAuthorChange}
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

export default Publications;
