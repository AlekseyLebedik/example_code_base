import React from 'react';
import PropTypes from 'prop-types';
import map from 'lodash/map';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';

import { useStyles } from '../styles';

const CustomSelectInput = ({ label, options, value, setParentValue }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.select} size="small" variant="outlined">
      <FormLabel id={`${value}_select`}>{label}</FormLabel>
      <Select
        fullWidth
        labelId={`${value}_select`}
        value={value}
        onChange={e => setParentValue(e.target.value)}
        placeholder={label}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {map(options, o => {
          return <MenuItem value={o.value}>{o.value}</MenuItem>;
        })}
      </Select>
    </FormControl>
  );
};

CustomSelectInput.defaultProps = {
  label: 'None',
  options: [],
  value: null,
  setParentValue: () => {},
};

CustomSelectInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  setParentValue: PropTypes.func,
};

export default CustomSelectInput;
