import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { components } from 'react-select';
import AutocompleteGeneral from 'dw/core/components/FormFields/AutocompleteGeneral';
import IconButton from 'dw/core/components/IconButton';

import { required } from 'dw/core/components/FormFields/validation';
import { keyGenerator, getDefaultOption } from '../../helpers';

import styles from './index.module.css';

const DropdownIndicator = props => {
  const { isSearchDisabled, onSearch } = props.selectProps;
  return (
    <components.DropdownIndicator
      {...props}
      className={styles.indicatorContainer}
    >
      <IconButton
        disabled={isSearchDisabled}
        icon="search"
        onClick={onSearch}
        tooltip="Advanced Search"
        className={styles.searchIcon}
      />
    </components.DropdownIndicator>
  );
};
DropdownIndicator.propTypes = {
  selectProps: PropTypes.shape({
    isSearchDisabled: PropTypes.bool.isRequired,
    onSearch: PropTypes.func.isRequired,
  }).isRequired,
};
const AutocompleteScheduleField = props => {
  const {
    allowDetachedEvents,
    defaultValue,
    isClearable,
    isDisabled,
    onChange,
    onSearch,
    options,
    value,
  } = props;

  const defaultOption = getDefaultOption(options, value, defaultValue);
  const key = keyGenerator(defaultOption);

  return (
    <Field
      component={AutocompleteGeneral}
      components={{ DropdownIndicator }}
      defaultValue={defaultOption}
      isClearable={isClearable}
      isSearchable={false}
      isSearchDisabled={isDisabled}
      key={key}
      menuIsOpen={false}
      name="schedule"
      onChange={onChange}
      onSearch={onSearch}
      options={[...options]}
      placeholder="Schedule"
      textFieldProps={{ onClick: onSearch }}
      {...(!allowDetachedEvents && {
        validate: [required],
      })}
    />
  );
};

AutocompleteScheduleField.propTypes = {
  allowDetachedEvents: PropTypes.bool,
  defaultValue: PropTypes.number,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func,
  onSearch: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.number,
};

AutocompleteScheduleField.defaultProps = {
  allowDetachedEvents: false,
  defaultValue: undefined,
  isClearable: true,
  isDisabled: false,
  onChange: undefined,
  value: undefined,
};

export default AutocompleteScheduleField;
