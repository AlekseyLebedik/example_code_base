import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  select: {
    '& .abtesting-MuiSelect-select:focus': {
      backgroundColor: '#FFF',
    },
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 2,
  },
  errorText: {
    marginTop: '3px',
    fontSize: '0.8571428571428571rem',
    color: theme.palette.error.main,
    marginLeft: '14px',
  },
}));

const ChipsField = ({
  value,
  handleChange,
  name,
  id,
  label,
  options,
  touched,
  error,
}) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        className={classes.select}
        labelId={id}
        name={name}
        multiple
        value={value}
        onChange={handleChange}
        label={label}
        error={!!touched && !!error}
        renderValue={selected => (
          <div className={classes.chips}>
            {selected.map(val => (
              <Chip key={val} label={val} className={classes.chip} />
            ))}
          </div>
        )}
      >
        {options.map(v => (
          <MenuItem key={v} value={v}>
            <Checkbox color="primary" checked={value.indexOf(v) > -1} />
            <ListItemText primary={v} />
          </MenuItem>
        ))}
      </Select>
      {!!touched && error && <span className={classes.errorText}>{error}</span>}
    </FormControl>
  );
};

ChipsField.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  options: PropTypes.array,
  touched: PropTypes.bool,
  error: PropTypes.string,
};

ChipsField.defaultProps = {
  value: '',
  handleChange: () => {},
  name: '',
  id: '',
  label: '',
  options: [],
  touched: false,
  error: '',
};

export default ChipsField;
