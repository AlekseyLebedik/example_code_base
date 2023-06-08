import React from 'react';
import PropTypes from 'prop-types';
import AutocompleteGeneral from 'dw/core/components/AutocompleteGeneral';
import { keyGenerator, getDefaultOption } from '../../helpers';

const AutocompleteSchedule = props => {
  const { defaultValue, isClearable, isDisabled, onChange, options, value } =
    props;

  const defaultOption = getDefaultOption(options, value, defaultValue);
  const key = keyGenerator(defaultOption);

  return (
    <AutocompleteGeneral
      defaultValue={defaultOption}
      isClearable={isClearable}
      isDisabled={isDisabled}
      key={key}
      onChange={onChange}
      options={[...options]}
      placeholder="Schedule"
    />
  );
};

AutocompleteSchedule.propTypes = {
  defaultValue: PropTypes.number,
  isClearable: PropTypes.bool,
  isDisabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  value: PropTypes.number,
};

AutocompleteSchedule.defaultProps = {
  defaultValue: undefined,
  isClearable: true,
  isDisabled: false,
  value: undefined,
};

export default AutocompleteSchedule;
