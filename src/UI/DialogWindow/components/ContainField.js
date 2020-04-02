import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import FormControl from '@material-ui/core/FormControl';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import axios from 'axios'

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

// const fields = [
//   'Techniki informatyczne',
//   'Techniki wytwarzania',
//   'Zapis konstrukcji 1',
//   'Matematyka 1',
//   'Fizyka 1',
//   'Chemia',
//   'Mechanika 1',
//   'Podstawy nauki o materiałach',
//   'Elektrotechnika i elektronika',
//   'Zapis konstrukcji 2',
//   'Matematyka 2',
//   'Fizyka 2',
//   'Metody numeryczne',
//   'Mechanika 2',
//   'Wytrzymałość materiałów',
//   'Podstawy automatyki',
//   'Maszyny i urządzenia przeróbki metali',
//   'Teoria mechanizmów i maszyn',
//   'Informatyka',
//   'Systemy wizyjne',
//   'Podstawy informatyki',
//   'Matematyka',
//   'Chemia',
//   'Podstawy marketingu',
//   'Makroekonomia',
//   'Fizyka',
//   'Mechanika 1',
//   'Programowanie obiektowe 1',
//   'Techniki wytwarzania',
//   'Zapis konstrukcji',
//   'Podstawy nauki o materiałach',
//   'Mechanika 2',
//   'Wytrzymałość materiałów',
//   'Podstawy automatyki',
//   'Układy elektroniczne',
//   'Metody numeryczne i statystyka',
//   'Podstawy konstrukcji mechanizmów urządzeń mechatronicznych',
//   'Teoria sterowania',
//   'Technologie wytwarzania',
//   'Podstawy mechatroniki',
//   'Języki programowania obiektowego',
//   'Modelowanie obiektowe',
//   'Mechatroniczne systemy wykonawcze, sensoryczne i sterujące',
//   'Wirtualne prototypowanie w projektowaniu',
//   'Roboty przemysłowe',
//   'Roboty usługowe',
//   'Projektowanie mechatroniczne',
//   'Identyfikacja i analiza sygnałów',
//   'Komputerowe wspomaganie wytwarzania',
//   'Inżynieria oprogramowania',
//   'Systemy wizyjne',
//   'Techniki wizyjne',
// ].sort();

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
  const [contains, setContains] = useState([])

  useEffect(() => {
    axios.get('https://syllabuskrk.agh.edu.pl/2019-2020/magnesite/api/faculties/wimir/study_plans/stacjonarne-inzynieria-mechatroniczna/modules?fields=name,module-code',
     { headers: {
       'Content-Type': 'application/json',
       'Accept-Language': 'pl',
       'Accept': 'application/vnd.syllabus.agh.edu.pl.v2+json'
     },
      crossdomain: true, 
     })
      .then(response => {
        const mechPL = []
        response.data.syllabus.assignments.map(studiesClass => {
          return mechPL.push(studiesClass.assignment.module.name)
        })
        return setContains(mechPL.sort())
      })
      .catch(err => console.log(err))
  }, [])

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
        {contains.length > 1 ? contains.map(field => (
          <MenuItem 
            key={field} 
            style={getStyles(field, props.contains, theme)}
            value={field} 
          >
            {field}
          </MenuItem>
        )) : null}
      </Select>
    </FormControl>    
  )
}

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(3),
    width: '100%'
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

ContainField.propTypes = {
  classes: PropTypes.object,
  contains: PropTypes.array,
  containsChange: PropTypes.func
}

export default ContainField
