import React from 'react'
import { makeStyles } from '@material-ui/styles';

import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const naming = {
  title: 'Nazwa',
  type: 'Typ',
  field: 'Dotyczy',
  author: 'Autor',
  Supervisor: 'Promotor'
}

const FilterConditions = props => {
  const { category, inputValue, filterRequests, handleDeleteFilter } = props;
  const classes = useStyles();
  console.log('filter w komp', filterRequests)
  return (
    <div>
      <div className={classes.filter}>
        { filterRequests.map((filter, id) => {
          return <React.Fragment key={id}>
            <span className={classes.span}><i>{naming[filter.category]}: {filter.searchInput}</i></span>
            <HighlightOffIcon className={classes.icon} onClick={(event) => handleDeleteFilter(id)}/>
          </React.Fragment>
        }) }
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
    maxHeight: '36px',
  },
  filter: {
    display: 'flex',
    alignContent: 'center',
    //margin: theme.spacing(2)
    margin: '20px'
  },
  span: {
    paddingTop: '2px',
  },
  icon: {
    fontSize: '5',
    marginLeft: '5px',
    marginRight: '10px',
    cursor: 'pointer',
  },
}));

export default FilterConditions