import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  //CardActions,
  CardContent,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  //TablePagination
} from '@material-ui/core';

import GetAppIcon from '@material-ui/icons/GetApp';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const DocumentsTable = props => {
  const { className, documentsData, fileDownload, findSelected, categories, ...rest } = props;

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    const { documentsData } = props;

    let selectedUsers;

    if (event.target.checked) {
      selectedUsers = documentsData.map(doc => doc.id);
    } else {
      selectedUsers = [];
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }
    setSelectedUsers(newSelectedUsers);
    console.log(newSelectedUsers)
    findSelected(newSelectedUsers)
  };

  // const handlePageChange = (event, page) => {
  //   setPage(page);
  // };

  // const handleRowsPerPageChange = event => {
  //   setRowsPerPage(event.target.value);
  // };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === documentsData.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < documentsData.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  { props.categories.map(category => <TableCell key={category.key}>{category.label}</TableCell>) }
                  <TableCell>Dodane dnia</TableCell>
                  <TableCell>Pobierz</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documentsData.slice(0, rowsPerPage).map(doc => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={doc.id}
                    selected={selectedUsers.indexOf(doc.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(doc.id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, doc.id)}
                        value="true"
                      />
                    </TableCell>
                    { props.categories.map(category => <TableCell key={category.key}>{doc[category.key]}</TableCell>) }
                    <TableCell>
                      {moment(doc.addedAt).format('DD/MM/YYYY')}
                    </TableCell>
                    <TableCell>
                      <GetAppIcon onClick={() => fileDownload(doc.file)} style={{cursor: 'pointer'}}/>                    
                    </TableCell>                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      {/* <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={documentsData.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions> */}
    </Card>
  );
};

DocumentsTable.propTypes = {
  className: PropTypes.string,
  documentsData: PropTypes.array.isRequired,
  findSelected: PropTypes.func,
  fileDownload: PropTypes.func
};

export default DocumentsTable;
