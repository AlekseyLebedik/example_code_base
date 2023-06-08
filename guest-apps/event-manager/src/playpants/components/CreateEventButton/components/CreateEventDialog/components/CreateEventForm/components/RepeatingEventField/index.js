import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';

import CassetteSelect from 'playpants/components/FormFields/CassetteSelect';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';

import DateTimePicker from 'dw/core/components/DateTimePickerV2/LocalizedFormFieldDateTimePicker';
import Input from 'dw/core/components/FormFields/Input';
import { required } from 'dw/core/components/FormFields/validation';
import Select from 'dw/core/components/FormFields/Select';

import {
  REPEAT_EVENT_INTERVALS,
  REPEAT_EVENT_OPTIONS,
} from 'playpants/components/ScheduleComponent/constants';

const RepeatingEventField = ({ eventRecurrence, repeatEndMinDate }) => {
  const minFrequency = value => (value < 1 ? 1 : value);

  return (
    <>
      <Grid item xs={12}>
        <Field
          component={CassetteSelect}
          fullWidth
          label="Recurrence"
          name="eventRecurrence"
          options={REPEAT_EVENT_OPTIONS}
        />
      </Grid>
      {eventRecurrence === 'repeat' && (
        <>
          <Grid item xs={2}>
            <Field
              component={Input}
              fullWidth
              label="Frequency"
              name="eventRepeatFrequency"
              normalize={minFrequency}
              type="number"
            />
          </Grid>
          <Grid item xs={4}>
            <Field
              component={Select}
              fullWidth
              label="Interval"
              name="eventRepeatInterval"
            >
              {Object.entries(REPEAT_EVENT_INTERVALS).map(
                ([interval, label]) => (
                  <MenuItem key={interval} value={interval}>
                    {label}
                  </MenuItem>
                )
              )}
            </Field>
          </Grid>
          <Grid item xs={6}>
            <Field
              autoComplete="off"
              component={DateTimePicker}
              footerLabel="Confirm"
              fullWidth
              label="Repeat End Date"
              minDate={repeatEndMinDate}
              name="eventRepeatEndDate"
              returnTimestamp
              validate={[required]}
            />
          </Grid>
        </>
      )}
    </>
  );
};

RepeatingEventField.propTypes = {
  eventRecurrence: PropTypes.string.isRequired,
  repeatEndMinDate: PropTypes.PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

RepeatingEventField.defaultProps = {
  repeatEndMinDate: null,
};

export default RepeatingEventField;
