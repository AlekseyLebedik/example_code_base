import React from 'react';
import PropTypes from 'prop-types';

import DateTimePicker from 'dw/core/components/DateTimePickerV2/LocalizedFormFieldDateTimePicker';

import { modifyRepeatEventSettings } from '../../helpers';

import styles from './index.module.css';

const RepeatEndDate = props => {
  const { eventData, label, onSave: saveDate } = props;
  const { end_at: endAt, repeat_event_settings: repeatEventSettings } =
    eventData;
  const { end_repeat_at: endRepeatAt } = repeatEventSettings;

  const onSave = e =>
    saveDate(
      'repeat_event_settings',
      modifyRepeatEventSettings(repeatEventSettings, 'end_repeat_at', e)
    );

  return (
    <DateTimePicker
      input={{
        classes: { dialog: styles.dialog, input: styles.dateInput },
        InputLabelProps: { shrink: true },
        label,
        minDate: endAt,
        onChange: onSave,
        value: endRepeatAt,
      }}
    />
  );
};

RepeatEndDate.propTypes = {
  eventData: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default RepeatEndDate;
