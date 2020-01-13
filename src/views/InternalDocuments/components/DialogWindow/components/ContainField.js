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

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
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
        required
        labelId="contains-chip-label"
        id="contains-chip"
        multiple
        value={props.contains}
        onChange={props.containsChange}
        input={<Input id="select-multiple-chip" />}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(value => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {fields.map(field => (
          <MenuItem key={field} value={field} style={getStyles(field, props.contains, theme)}>
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