import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, formValueSelector, change } from 'redux-form';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import DateTimePicker from 'dw/core/components/DateTimePickerV2/LocalizedFormFieldDateTimePicker';
import ColorPicker from 'playpants/components/FormFields/ColorPicker';
import CassetteSelect from 'playpants/components/FormFields/CassetteSelect';
import Checkbox from 'dw/core/components/FormFields/Checkbox';
import Duration from 'playpants/components/FormFields/Duration';

import {
  getDurationObjFromNow,
  getStartTimeFromDuration,
  timezoneOrDefaultSelector,
} from 'playpants/helpers/dateTime';
import * as V from 'dw/core/components/FormFields/validation';
import { TYPE_OPTIONS, PRIORITY_OPTIONS } from './constants';

import styles from './index.module.css';

const useStyles = makeStyles({
  dropdownListItem: {
    '& li': {
      width: `100% !important`,
      padding: '6px 16px !important',
      justifyContent: 'flex-start !important',
    },
  },
});

const TimewarpSettingsFormFields = ({
  dateTime,
  duration,
  onExternalSetDuration,
  onSetDateTime,
  onSetNegativeOffset,
  type,
  userTimezone,
}) => {
  const [dateTimeValue, setDateTime] = useState(null);
  const classes = useStyles();
  const isOffset = type === 'offset';

  useEffect(() => {
    setDateTime(
      isOffset ? getStartTimeFromDuration(userTimezone, duration) : dateTime
    );
  }, [duration, dateTime, setDateTime]);

  const handleSetTime = timestamp => {
    setDateTime(timestamp);
    if (isOffset) {
      const newDuration = getDurationObjFromNow(timestamp);
      const negativeOffset = Object.values(newDuration).some(v => v < 0);
      Object.entries(newDuration).forEach(([key, value]) => {
        newDuration[key] = Math.abs(value);
      });
      onSetNegativeOffset(negativeOffset);
      onExternalSetDuration(newDuration);
    } else {
      onSetDateTime(timestamp);
    }
  };

  return (
    <Paper className={styles.container}>
      <label className={styles.titleContent}>Timewarp Settings</label>
      <div className={styles.formContainer}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Field
              component={CassetteSelect}
              fullWidth
              label="Type"
              name="type"
              options={TYPE_OPTIONS}
              SelectProps={{
                MenuProps: {
                  classes: { list: classes.dropdownListItem },
                },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Field
              component={CassetteSelect}
              fullWidth
              label="Priority"
              name="priority"
              options={PRIORITY_OPTIONS}
              SelectProps={{
                MenuProps: {
                  classes: { list: classes.dropdownListItem },
                },
              }}
            />
          </Grid>
        </Grid>
        {type && (
          <>
            {isOffset && (
              <div className={styles.durationGrid}>
                <Field
                  name="negativeOffset"
                  component={Checkbox}
                  label="Negative Offset"
                />
                <Duration
                  classes={{ container: styles.durationForm }}
                  duration={duration}
                />
              </div>
            )}
            <Field
              className={styles.dateTimePicker}
              clearable
              component={DateTimePicker}
              fullWidth
              InputProps={{ className: styles.dateTimePicker }}
              label={isOffset ? 'Current Time Warped To' : 'Date'}
              input={{
                onChange: handleSetTime,
                value: dateTimeValue,
              }}
              name="date_time"
              returnTimestamp
              {...(isOffset ? {} : { validate: [V.required] })}
            />
            <Field component={ColorPicker} label="Group Color" name="color" />
          </>
        )}
      </div>
    </Paper>
  );
};

TimewarpSettingsFormFields.propTypes = {
  dateTime: PropTypes.number,
  duration: PropTypes.object.isRequired,
  onExternalSetDuration: PropTypes.func.isRequired,
  onSetDateTime: PropTypes.func.isRequired,
  onSetNegativeOffset: PropTypes.func.isRequired,
  type: PropTypes.string,
  userTimezone: PropTypes.string.isRequired,
};
TimewarpSettingsFormFields.defaultProps = {
  dateTime: null,
  type: null,
};

const createEventFormSelector = formName => formValueSelector(formName);

const mapStateToProps = (state, ownProps) => ({
  dateTime: createEventFormSelector(ownProps.form)(state, 'date_time'),
  duration: createEventFormSelector(ownProps.form)(state, 'duration'),
  type: createEventFormSelector(ownProps.form)(state, 'type'),
  userTimezone: timezoneOrDefaultSelector(state),
});

const dispatchToProps = (dispatch, ownProps) => ({
  change: (form, name, values) => change(form, name, values),
  onSetDateTime: dateTime =>
    dispatch(change(ownProps.form, 'date_time', dateTime)),
  onSetNegativeOffset: checked =>
    dispatch(change(ownProps.form, 'negativeOffset', checked)),
  onExternalSetDuration: duration =>
    dispatch(change(ownProps.form, 'duration', duration)),
});

export default connect(
  mapStateToProps,
  dispatchToProps
)(TimewarpSettingsFormFields);
