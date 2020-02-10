import React from 'react'
import MuiAlert from '@material-ui/lab/Alert';

const alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default alert