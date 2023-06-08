import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import isObjectLike from 'lodash/isObjectLike';

import TextField from '@material-ui/core/TextField';
import Input from 'dw/core/components/FormFields/Input';
import AutocompleteGeneral from 'dw/core/components/FormFields/AutocompleteGeneral';

import styles from './index.module.css';

const OPTION_COUNT_TYPE = {
  hours: 24,
  minutes: 60,
  seconds: 60,
};

const getDurationOptions = to => {
  const options = [];
  let from = 0;
  while (from < to) {
    options.push({ value: from, label: `${from}` });
    from += 1;
  }
  return options;
};

const DurationField = ({
  defaultValue,
  handleChange,
  type,
  useRedux,
  ...props
}) => {
  if (!useRedux) {
    const value =
      defaultValue && isObjectLike(defaultValue)
        ? defaultValue.value
        : defaultValue;
    return (
      <TextField
        {...props}
        InputProps={{
          classes: {
            input: styles.customInputStyle,
          },
        }}
        type="number"
        fullWidth
        onBlur={handleChange}
        defaultValue={Number.isInteger(value) ? value : ''}
      />
    );
  }

  return type === 'days' ? (
    <Field
      component={Input}
      InputProps={{
        classes: {
          input: styles.customInputStyle,
        },
      }}
      // eslint-disable-next-line react/jsx-no-duplicate-props
      inputProps={{ min: 0 }}
      type="number"
      fullWidth
      {...props}
    />
  ) : (
    <Field
      component={AutocompleteGeneral}
      isClearable={false}
      options={getDurationOptions(OPTION_COUNT_TYPE[type])}
      value={defaultValue}
      defaultValue={defaultValue}
      key={defaultValue.value}
      {...props}
    />
  );
};

DurationField.propTypes = {
  type: PropTypes.string.isRequired,
  useRedux: PropTypes.bool.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  handleChange: PropTypes.func,
};
DurationField.defaultProps = {
  defaultValue: null,
  handleChange: null,
};

export default DurationField;
