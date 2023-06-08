import React from 'react';
import PropTypes from 'prop-types';
import AdvancedScheduleField from 'playpants/components/StoryFormComponents/components/AdvancedScheduleField';
import DisabledScheduleField from './components/DisabledScheduleField';

const ScheduleFieldWrapper = props => {
  const { disabledTooltip, isDisabled, ...scheduleFieldProps } = props;
  const scheduleOption =
    scheduleFieldProps.options.find(
      option => option.value === scheduleFieldProps.value
    ) || {};
  return !isDisabled ? (
    <AdvancedScheduleField {...scheduleFieldProps} />
  ) : (
    <DisabledScheduleField
      schedule={scheduleOption.label}
      disabledTooltip={disabledTooltip}
    />
  );
};

ScheduleFieldWrapper.propTypes = {
  disabledTooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.string])
    .isRequired,
  isDisabled: PropTypes.bool.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleOnLoadComplete: PropTypes.func.isRequired,
};

export default ScheduleFieldWrapper;
