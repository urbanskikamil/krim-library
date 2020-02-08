import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  },
  toolbarButton: {
    marginLeft: theme.spacing(1)
  }
}));

const ThesisToolbar = props => {
  const { className, clicked, deleteDialogOpen, ...rest } = props;

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
        />
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button> */}
        <Button
          color="secondary"
          onClick={clicked}
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Dodaj dokument
        </Button>
        <Button
          className={classes.toolbarButton}
          onClick={deleteDialogOpen}
          variant="contained"
          startIcon={<DeleteIcon />}
        >
          Usuń dokument
        </Button>
      </div>
    </div>
  );
};

ThesisToolbar.propTypes = {
  className: PropTypes.string,
  clicked: PropTypes.func,
};

export default ThesisToolbar;
