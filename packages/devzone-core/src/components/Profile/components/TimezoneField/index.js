import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { ProfileStyles, useStyles } from '../constants';

const tzNames = moment.tz.names();
const localTz = moment.tz.guess();
const { AutoComplete } = global;

const Option = props => (
  <MenuItem
    buttonRef={props.innerRef}
    selected={props.isFocused}
    disabled={props.isDisabled}
    component="div"
    style={props.getStyles('option', props)}
    {...props.innerProps}
  >
    {props.data.label}
  </MenuItem>
);

Option.propTypes = {
  data: PropTypes.object.isRequired,
  getStyles: PropTypes.func.isRequired,
  innerProps: PropTypes.object.isRequired,
  innerRef: PropTypes.object.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  isFocused: PropTypes.bool.isRequired,
};

const TimezoneField = ({ formik }) => {
  const classes = useStyles();
  let tzOptions = [
    { value: '-', label: `Local Timezone (${localTz})` },
    { value: 'UTC', label: 'UTC' },
  ];

  tzOptions = tzOptions.concat(
    tzNames.filter(tz => tz !== 'UTC').map(tz => ({ value: tz, label: tz }))
  );
  const name = 'timezone';
  const label = 'Show date/time in';

  if (AutoComplete) {
    return (
      <AutoComplete
        styles={ProfileStyles}
        onChange={option => formik.setFieldValue(name, option)}
        defaultValue={
          tzOptions
            ? tzOptions.find(
                option => option.value === (formik.values.timezone || '-')
              )
            : ''
        }
        name={name}
        label={label}
        fullWidth
        options={tzOptions}
        isClearable={false}
        components={{ Option }}
      />
    );
  }
  return (
    <>
      <InputLabel className={classes.font}>{label}</InputLabel>
      <Select
        value={formik.values.timezone || '-'}
        onChange={formik.handleChange}
        name={name}
        fullWidth
      >
        {tzOptions.map(({ value, label: optionLabel }) => (
          <MenuItem value={value} key={value}>
            {optionLabel}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

TimezoneField.propTypes = {
  formik: PropTypes.object.isRequired,
};

export default TimezoneField;
