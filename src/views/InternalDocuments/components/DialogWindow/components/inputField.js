import React from 'react'

import TextField from '@material-ui/core/TextField';

const fields = [
  {id:'title', label: 'Tytuł dokumentu'},
  {id:'author', label: 'Autor'},
  {id:'supervisor', label: 'Promotor'},
]

const inputField = () => {
  return( fields.map((field, index) => 
    <TextField
      key={index}
      required
      variant="filled"
      margin="dense"
      id={field.id}
      label={field.label}
      //type="text"
      fullWidth
    />)
  )
}

export default inputField