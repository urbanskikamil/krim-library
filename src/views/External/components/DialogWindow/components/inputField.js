import React from 'react'

import TextField from '@material-ui/core/TextField';

const inputField = (props) => {
  const fields = [
    {id:'title', label: 'Tytuł dokumentu', value: props.title, change: props.titleChange},
    {id:'author', label: 'Autor', value: props.author, change: props.authorChange},
    {id:'supervisor', label: 'Promotor', value: props.supervisor, change: props.supervisorChange},
  ]

  return( fields.map((field, index) => 
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