import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { Delete, CloudUpload } from '@material-ui/icons';

import { SearchInput } from 'components';
import FilterConditions from './components/FilterConditions'

const ThesisToolbar = props => {
  const { className, clicked, deleteDialogOpen, category, filtered, filterRequests, inputValue, handleCategory, handleSearch, handleInput, handleDeleteFilter, ...rest } = props;
  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Znajdź"
          category={category}
          handleCategory={handleCategory}
          handleSearch={handleSearch}
          handleInput={handleInput}
        />
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button> */}
        <Button
          color="secondary"
          onClick={clicked}
          variant="contained"
          startIcon={<CloudUpload />}
        >
          Dodaj dokument
        </Button>
        <Button
          className={classes.toolbarButton}
          onClick={deleteDialogOpen}
          variant="contained"
          startIcon={<Delete />}
        >
          Usuń dokument
        </Button>
      </div>
      { filtered ?
        <FilterConditions category={category} inputValue={inputValue} filterRequests={filterRequests} handleDeleteFilter={handleDeleteFilter} />
        : null
      }
    </div>
  );
};

ThesisToolbar.propTypes = {
  className: PropTypes.string,
  clicked: PropTypes.func,
  deleteDialogOpen: PropTypes.func,
  handleCategory: PropTypes.func,
};

const useStyles = makeStyles(theme => ({
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'flex-end',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  searchInput: {
    marginRight: theme.spacing(1),
    maxWidth: '250px'
  },
  toolbarButton: {
    marginLeft: theme.spacing(1)
  }
}));

export default ThesisToolbar;
