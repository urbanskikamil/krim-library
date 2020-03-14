import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import SearchIcon from '@material-ui/icons/Search';

import { Button, Paper, Input, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';

const categories = [
  {label: 'Typ', key: 'type'},
  {label: 'Nazwa', key: 'title'},
  {label: 'Dotyczy', key: 'field'},
  {label: 'Autor', key: 'author'},
  {label: 'Promotor', key: 'Supervisor'},
]

const SearchInput = props => {
  const { className, onChange, style, category, handleCategory, handleSearch, handleInput, ...rest } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper
        {...rest}
        className={clsx(classes.root, className)}
        style={style}
      >
        <Input
          {...rest}
          className={classes.input}
          disableUnderline
          onChange={event => handleInput(event)}
        />
      </Paper>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-autowidth-label">Szukaj w:</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={category}
          onChange={event => handleCategory(event)}
          autoWidth
        >
          {categories.map((cat, id) => {
            return <MenuItem key={id} value={cat.key}>{cat.label}</MenuItem>
          })}
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        startIcon={<SearchIcon className={classes.icon} />}
        onClick={handleSearch}
      >
        Szukaj
      </Button>
    </React.Fragment>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    maxHeight: '36px',
  },
  searchField: {
    margin: theme.spacing(1)
  },
  button: {
    marginLeft: theme.spacing(1),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
