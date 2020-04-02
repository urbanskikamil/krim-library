/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const typeField = (props) => {
  return (
    <form  
      className={props.classes.form} 
      noValidate
    >
      <FormControl  
        className={props.classes.formControl}
      >
        <InputLabel htmlFor="document-type">Typ dokumentu</InputLabel>
        <Select      
          onChange={props.typeChange}
          required  
          value={props.documentType}
        >
          { props.types.map(type => <MenuItem key={type.value} value={type.value}>{type.value}</MenuItem>) }
        </Select>
      </FormControl>
    </form>
  )
}

export default typeField

typeField.propTypes = {
  classes: PropTypes.object,
  documentType: PropTypes.string,
  maxWidth: PropTypes.number,
  type: PropTypes.string,
  typeChange: PropTypes.func,
  widthChange: PropTypes.func
};
