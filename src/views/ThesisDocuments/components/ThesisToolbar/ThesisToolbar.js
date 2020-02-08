import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import { SearchInput } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
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
  }
}));

const ThesisToolbar = props => {
  const { className, clicked, ...rest } = props;

  const classes = useStyles();

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button className={classes.importButton}>Import</Button>
        <Button className={classes.exportButton}>Export</Button> */}
        <Button
          color="primary"
          onClick={clicked}
          variant="contained"
        >
          Dodaj dokument
        </Button>
        <Button
          color="primary"
          onClick={props.deleterecord}
          variant="contained"
        >
          Usuń dokument
        </Button>
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Znajdź"
        />
      </div>
    </div>
  );
};

ThesisToolbar.propTypes = {
  className: PropTypes.string,
  clicked: PropTypes.func,
  deleterecord: PropTypes.func
};

export default ThesisToolbar;
