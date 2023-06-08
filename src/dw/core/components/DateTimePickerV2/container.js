import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import {
  dateIsAfter,
  dateIsBefore,
  dateToDefaultTimestamp,
  getDateFromTimestampOrMoment,
  timezoneOrDefaultSelector,
} from 'dw/core/helpers/date-time';

import DateTimePickerStateless from './presentational';

const formatReturnDates = (returnTimestamp, { startDate, endDate }) => {
  let start;
  let end;
  if (returnTimestamp) {
    start = startDate ? dateToDefaultTimestamp(startDate) : '';
    end = endDate ? dateToDefaultTimestamp(endDate) : '';
  } else {
    start = startDate ? moment(startDate) : '';
    end = endDate ? moment(endDate) : '';
  }
  return { start, end };
};

const DateTimePicker = ({
  allowContinuous,
  autoOk,
  dateOnly,
  direction,
  endDateRequired,
  hideSidePanel,
  maxDate,
  minDate,
  months,
  onChange,
  ranged,
  rangeLabels,
  returnTimestamp,
  timezone,
  value,
  ...props
}) => {
  const anchorEl = useRef(null);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [focusedRange, setFocusedRange] = useState([0, 0]);
  const [rangeState, setRangeState] = useState({
    startDate: '',
    endDate: '',
    key: 'selection',
    color: '#009688',
  });

  const handleDateStateUpdate = v => {
    if (ranged) {
      setRangeState({
        ...rangeState,
        startDate: v.startDate
          ? getDateFromTimestampOrMoment(v.startDate)
          : null,
        endDate: v.endDate ? getDateFromTimestampOrMoment(v.endDate) : null,
      });
    } else {
      setSelectedDate(v ? getDateFromTimestampOrMoment(v) : '');
    }
  };

  useEffect(() => {
    handleDateStateUpdate(value);
  }, [value]);

  const onClearValue = (e, type) => {
    e.stopPropagation();
    let { startDate, endDate } = rangeState;
    switch (type) {
      case 'startDate':
        startDate = '';
        break;
      case 'endDate':
        endDate = '';
        break;
      default:
        startDate = '';
        endDate = null;
        break;
    }
    if (open) handleDateStateUpdate(ranged ? { startDate, endDate } : '');
    else {
      const { start, end } = formatReturnDates(returnTimestamp, {
        startDate,
        endDate,
      });
      onChange(ranged ? { startDate: start, endDate: end } : start);
    }
  };

  const onClose = () => {
    setOpen(false);
    handleDateStateUpdate(value);
  };

  const onOpen = type => {
    if (type) {
      setFocusedRange(type === 'startDate' ? [0, 0] : [0, 1]);
    }
    setOpen(true);
  };

  const onSubmitRange = values => {
    const { startDate, endDate } = values || rangeState;
    const validStart = startDate && !dateIsBefore(startDate, minDate, timezone);
    const validEnd =
      !endDateRequired ||
      (endDate &&
        !dateIsBefore(endDate, startDate, timezone) &&
        !dateIsAfter(endDate, maxDate, timezone));
    if (validStart && validEnd) {
      const { start, end } = formatReturnDates(returnTimestamp, {
        startDate,
        endDate,
      });
      onChange({ startDate: start, endDate: end });
    }
  };

  const onSubmitDateTime = date => {
    const newDate = date || selectedDate;
    if (
      newDate &&
      !dateIsBefore(newDate, minDate, timezone) &&
      !dateIsAfter(newDate, maxDate, timezone)
    ) {
      const { start } = formatReturnDates(returnTimestamp, {
        startDate: newDate,
      });
      onChange(start);
    }
  };

  const onSubmit = selected => {
    onClose();
    if (ranged) {
      onSubmitRange(selected);
    } else {
      onSubmitDateTime(selected);
    }
  };

  const onManualValueChange = (date, type) => {
    if (ranged) {
      if (open) handleDateStateUpdate({ ...rangeState, [type]: date });
      else onSubmitRange({ ...rangeState, [type]: date });
      setFocusedRange(type === 'startDate' ? [0, 1] : [0, 0]);
    } else if (open) handleDateStateUpdate(date);
    else onSubmitDateTime(date);
  };

  const commonDatePickerProps = {
    color: '#009688',
    direction,
    editableDateInputs: true,
    endDatePlaceholder: rangeLabels.endDate,
    fixedHeight: true,
    hideFooter: autoOk,
    hideSidePanel,
    months,
    onRangeFocusChange: setFocusedRange,
    showDateDisplay: false,
    startDatePlaceholder: rangeLabels.startDate,
    ...(maxDate && { maxDate: getDateFromTimestampOrMoment(maxDate) }),
    ...(minDate && { minDate: getDateFromTimestampOrMoment(minDate) }),
    ...(!dateOnly && { dateDisplayFormat: 'MMM d, yyyy H:mm:ss' }),
    ...(months === 1 && {
      direction: 'vertical',
      scroll: { enabled: true },
    }),
  };

  const datePickerProps = useMemo(
    () => ({
      ...(ranged
        ? {
            endDate: rangeState.endDate,
            focusedRange,
            onChange: item =>
              autoOk ? onSubmit(item.selection) : setRangeState(item.selection),
            ranges: allowContinuous
              ? [rangeState]
              : [
                  {
                    ...rangeState,
                    endDate: rangeState.endDate || rangeState.startDate,
                  },
                ],
          }
        : {
            date: selectedDate,
            onChange: autoOk ? onSubmit : setSelectedDate,
          }),
    }),
    [selectedDate, rangeState.startDate, rangeState.endDate, focusedRange]
  );

  return (
    <DateTimePickerStateless
      {...props}
      allowContinuous={allowContinuous}
      anchorEl={anchorEl}
      dateOnly={dateOnly}
      datePickerProps={{ ...commonDatePickerProps, ...datePickerProps }}
      endDateRequired={endDateRequired}
      maxDate={maxDate}
      minDate={minDate}
      onClearValue={onClearValue}
      onClose={onClose}
      onManualValueChange={onManualValueChange}
      onOpen={onOpen}
      onSubmit={onSubmit}
      open={open}
      ranged={ranged}
      rangeLabels={rangeLabels}
    />
  );
};

DateTimePicker.propTypes = {
  allowContinuous: PropTypes.bool,
  autoOk: PropTypes.bool,
  dateOnly: PropTypes.bool,
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  endDateRequired: PropTypes.bool,
  hideSidePanel: PropTypes.bool,
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  months: PropTypes.number,
  onChange: PropTypes.func,
  rangeLabels: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  ranged: PropTypes.bool,
  returnTimestamp: PropTypes.bool,
  timezone: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
};

DateTimePicker.defaultProps = {
  allowContinuous: false,
  autoOk: false,
  dateOnly: false,
  direction: 'horizontal',
  endDateRequired: false,
  hideSidePanel: false,
  maxDate: null,
  minDate: null,
  months: 2,
  onChange: () => {},
  ranged: false,
  rangeLabels: {
    startDate: 'Start Date',
    endDate: 'End Date',
  },
  returnTimestamp: false,
  timezone: moment.tz.guess(),
  value: null,
};

export default DateTimePicker;

const FormFieldDateTimePicker = ({
  input,
  meta: { touched, error },
  helperText,
  ...props
}) => {
  const isError = !!(touched && error);
  return (
    <DateTimePicker
      {...props}
      {...input}
      error={isError}
      helperText={isError ? error : helperText}
    />
  );
};

FormFieldDateTimePicker.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.shape({ touched: PropTypes.bool, error: PropTypes.string }),
  helperText: PropTypes.string,
};

FormFieldDateTimePicker.defaultProps = {
  meta: { touched: false, error: '' },
  helperText: undefined,
};

const stateToProps = state => ({
  timezone: timezoneOrDefaultSelector(state),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...ownProps,
  timezone: stateProps.timezone,
});

const LocalizedFormFieldDateTimePicker = connect(
  stateToProps,
  null,
  mergeProps
)(FormFieldDateTimePicker);

export { FormFieldDateTimePicker, LocalizedFormFieldDateTimePicker };
