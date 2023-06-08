import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import Select from 'dw/core/components/FormFields/Select';

import styles from 'playpants/scenes/Event/components/Repeats/index.module.css';

import { REPEAT_EVENT_INTERVALS } from 'playpants/components/ScheduleComponent/constants';

import { modifyRepeatEventSettings } from '../../helpers';

export const RepeatFreqBase = ({ disabled, eventData, onSave }) => {
  const { repeat_event_settings: repeatEventSettings } = eventData;
  const { frequency, interval } = repeatEventSettings;
  const handleChange = (type, value) =>
    onSave(
      'repeat_event_settings',
      modifyRepeatEventSettings(repeatEventSettings, type, value)
    );

  return (
    <>
      <TextField
        className={styles.repeatFreqField}
        disabled={disabled}
        InputProps={{ inputProps: { min: 1 } }}
        label="Frequency"
        onChange={e => handleChange('frequency', e.target.value)}
        type="number"
        value={frequency}
      />
      <Select
        className={styles.repeatIntervalField}
        disabled={disabled}
        label="Interval"
        onChange={e => handleChange('interval', e.target.value)}
        value={interval}
      >
        {Object.entries(REPEAT_EVENT_INTERVALS).map(([thisInterval, label]) => (
          <MenuItem key={thisInterval} value={thisInterval}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

RepeatFreqBase.propTypes = {
  disabled: PropTypes.bool.isRequired,
  eventData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default RepeatFreqBase;
