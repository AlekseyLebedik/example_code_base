import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import EventsCalendar from 'dw/core/components/EventsCalendar';
import { timezoneOrDefaultSelector } from 'dw/core/helpers/date-time';

import { renderDateValue, renderEndAdornment, selectStartEnd } from './helpers';

import styles from './index.module.css';

export const CalendarDatePicker = props => {
  const [isDisabled, disableDateSelection] = useState(true);
  const [open, toggleCalendarPicker] = useState(false);
  const [hoverDate, onHoverDateChange] = useState(null);
  const [startOnCancel, setStartOnCancel] = useState(null);
  const [endOnCancel, setEndOnCancel] = useState(null);

  const {
    calendarPickerProps: {
      endDate,
      endLabel,
      eventGroups,
      platforms,
      selectedProject,
      setEndDate,
      setStartDate,
      startDate,
      startLabel,
    },
    clearable,
    disabled,
    error,
    fullWidth,
    InputProps,
    InputLabelProps,
    timezone,
    variant,
    onFetchEvents,
  } = props;

  const dateFieldProps = {
    disabled,
    error,
    fullWidth,
    InputLabelProps,
    onClick: () => {
      if (platforms && selectedProject) {
        toggleCalendarPicker(true);
      }
    },
    variant,
  };

  useEffect(() => {
    if (open) {
      setStartOnCancel(startDate || null);
      setEndOnCancel(endDate || null);
    }
  }, [open]);

  const cancelDateSelection = () => {
    setStartDate(startOnCancel);
    setEndDate(endOnCancel);
    toggleCalendarPicker(false);
  };

  return (
    <>
      <TextField
        {...dateFieldProps}
        InputProps={{
          ...InputProps,
          endAdornment: renderEndAdornment(
            clearable,
            startDate,
            disabled,
            setStartDate
          ),
        }}
        label={startLabel}
        value={renderDateValue(startDate, timezone)}
      />
      <TextField
        {...dateFieldProps}
        InputProps={{
          ...InputProps,
          endAdornment: renderEndAdornment(
            clearable,
            endDate,
            disabled,
            setEndDate
          ),
        }}
        label={endLabel}
        value={renderDateValue(endDate, timezone)}
      />
      <Dialog fullWidth maxWidth="xl" onClose={cancelDateSelection} open={open}>
        <DialogContent className={styles.calendarDatePickerWrapper}>
          <EventsCalendar
            availableViews={['month']}
            createDisabled
            datePickerInfo={{
              disableDateSelection,
              endDate,
              hoverDate,
              onHoverDateChange,
              project: selectedProject,
              setEndDate,
              setStartDate,
              startDate,
            }}
            eventGroups={eventGroups}
            onSelectSlot={event =>
              selectStartEnd(
                event,
                startDate,
                endDate,
                setStartDate,
                setEndDate,
                timezone
              )
            }
            platforms={platforms}
            onFetchEvents={onFetchEvents}
            sidebar
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={cancelDateSelection}>
            Cancel Date Selection
          </Button>
          {(startDate || endDate) && (
            <Button
              color="primary"
              disabled={isDisabled}
              onClick={() => toggleCalendarPicker(false)}
            >
              Choose Dates
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

CalendarDatePicker.propTypes = {
  calendarPickerProps: PropTypes.shape({
    endDate: PropTypes.number,
    endLabel: PropTypes.string,
    eventGroups: PropTypes.arrayOf(PropTypes.object),
    platforms: PropTypes.arrayOf(PropTypes.string),
    selectedProject: PropTypes.object,
    setEndDate: PropTypes.func.isRequired,
    setStartDate: PropTypes.func.isRequired,
    startDate: PropTypes.number,
    startLabel: PropTypes.string,
  }),
  clearable: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  fullWidth: PropTypes.bool,
  InputProps: PropTypes.object,
  InputLabelProps: PropTypes.object,
  timezone: PropTypes.string.isRequired,
  variant: PropTypes.string,
  onFetchEvents: PropTypes.func,
};

CalendarDatePicker.defaultProps = {
  calendarPickerProps: {
    endDate: null,
    endLabel: '',
    eventGroups: [],
    platforms: [],
    selectedProject: null,
    startDate: null,
    startLabel: '',
  },
  clearable: true,
  disabled: false,
  error: false,
  fullWidth: false,
  InputProps: {},
  InputLabelProps: {},
  variant: 'standard',
  onFetchEvents() {},
};

const mapStateToProps = state => ({
  timezone: timezoneOrDefaultSelector(state),
});

export default connect(mapStateToProps)(CalendarDatePicker);
