import React from 'react'

import TextField from '@material-ui/core/TextField';

const inputField = (props) => {
  return( props.fields.map((field, index) => 
    <TextField
      fullWidth
      id={field.id}
      key={index}
      label={field.label}
      margin="dense"
      onChange={field.change}
      required
      value={field.value}
      variant="filled"
      //type="text"
    />)
  )
}

export default inputField