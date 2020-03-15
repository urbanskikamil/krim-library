import React from 'react'
import PropTypes from 'prop-types'

import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 120,
    maxWidth: '90%',
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const fields = [
  'Informatyka',
  'Mechanika',
  'Systemy wizyjne',
];

function getStyles(field, contains, theme) {
  return {
    fontWeight:
      contains.indexOf(field) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const ContainField = (props) => {
  const classes = useStyles();
  const theme = useTheme();

  return(
    <FormControl className={classes.formControl}>
      <InputLabel id="contains-chip-label">Dotyczy</InputLabel>
      <Select
        id="contains-chip"
        input={<Input id="select-multiple-chip" />}
        labelId="contains-chip-label"
        MenuProps={MenuProps}
        multiple
        onChange={props.containsChange}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip 
                className={classes.chip} 
                key={value} 
                label={value} 
              />
            ))}
          </div>
        )}
        required
        value={props.contains}
      >
        {fields.map(field => (
          <MenuItem 
            key={field} 
            style={getStyles(field, props.contains, theme)}
            value={field} 
          >
            {field}
          </MenuItem>
        ))}
      </Select>
    </FormControl>    
  )
}

export default ContainField

ContainField.propTypes = {
  classes: PropTypes.object,
  contains: PropTypes.array,
  containsChange: PropTypes.func
}