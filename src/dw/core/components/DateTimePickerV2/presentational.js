import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import classNames from 'classnames';

import DateTimeDialog from './components/DateTimeDialog';
import DateTimeField from './components/DateTimeField';

import styles from './index.module.css';

const DateTimePickerStateless = ({
  allowContinuous,
  anchorEl,
  classes,
  clearable,
  CustomEndAdornment,
  dateOnly,
  datePickerProps,
  disabled,
  endDateFieldProps,
  endDateRequired,
  error,
  events,
  footerLabel,
  fullWidth,
  helperText,
  InputLabelProps,
  InputProps,
  label,
  margin,
  maxDate,
  minDate,
  modifiers,
  onClearValue,
  onClose,
  onManualValueChange,
  onOpen,
  onSubmit,
  open,
  ranged,
  rangeLabels,
  startDateFieldProps,
  timezone,
  variant,
  verticalRangeFields,
}) => {
  const { date, endDate, focusedRange, ranges } = datePickerProps;
  const startDate = ranged ? ranges[0].startDate : date;
  const dateFieldCommonProps = {
    classes,
    clearable,
    CustomEndAdornment,
    dateOnly,
    disabled,
    error,
    fullWidth,
    helperText,
    InputLabelProps,
    InputProps,
    margin,
    maxDate,
    minDate,
    onChange: onManualValueChange,
    onClearValue,
    onOpen,
    timezone,
    variant,
  };

  return (
    <>
      <div
        className={classNames(styles.dateFieldContainer, {
          [styles.verticalContainer]: verticalRangeFields,
          [styles.fullWidthContainer]: fullWidth,
        })}
        ref={anchorEl}
      >
        <DateTimeField
          {...dateFieldCommonProps}
          {...startDateFieldProps}
          date={startDate}
          label={ranged ? rangeLabels.startDate : label}
          type={ranged ? 'startDate' : null}
        />
        {ranged && variant !== 'compact' && (
          <>
            {!verticalRangeFields && (
              <div
                className={classNames(styles.delimiter, {
                  [styles.delimiterMargin]: margin === 'normal',
                })}
              >
                <span>&rarr;</span>
              </div>
            )}
            <DateTimeField
              {...dateFieldCommonProps}
              {...endDateFieldProps}
              date={endDate}
              label={rangeLabels.endDate}
              minDate={startDate}
              type="endDate"
            />
          </>
        )}
      </div>
      <DateTimeDialog
        allowContinuous={allowContinuous}
        anchorEl={anchorEl}
        classes={classes}
        dateFieldCommonProps={dateFieldCommonProps}
        dateOnly={dateOnly}
        datePickerProps={datePickerProps}
        dates={{ startDate, endDate }}
        endDateFieldProps={endDateFieldProps}
        endDateRequired={endDateRequired}
        events={events}
        focusedRange={focusedRange}
        footerLabel={footerLabel}
        modifiers={modifiers}
        onClose={onClose}
        onSubmit={onSubmit}
        open={!disabled && open}
        ranged={ranged}
        startDateFieldProps={startDateFieldProps}
        timezone={timezone}
      />
    </>
  );
};

DateTimePickerStateless.propTypes = {
  allowContinuous: PropTypes.bool,
  anchorEl: PropTypes.object,
  classes: PropTypes.object,
  clearable: PropTypes.bool,
  CustomEndAdornment: PropTypes.object,
  dateOnly: PropTypes.bool,
  datePickerProps: PropTypes.object.isRequired,
  disabled: PropTypes.bool,
  endDateFieldProps: PropTypes.object,
  endDateRequired: PropTypes.bool,
  error: PropTypes.bool,
  events: PropTypes.arrayOf(PropTypes.object),
  footerLabel: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
  InputLabelProps: PropTypes.object,
  InputProps: PropTypes.object,
  label: PropTypes.string,
  margin: PropTypes.string,
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
  modifiers: PropTypes.object,
  onClearValue: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onManualValueChange: PropTypes.func.isRequired,
  onOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  ranged: PropTypes.bool.isRequired,
  rangeLabels: PropTypes.shape({
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  startDateFieldProps: PropTypes.object,
  timezone: PropTypes.string,
  variant: PropTypes.string,
  verticalRangeFields: PropTypes.bool,
};

DateTimePickerStateless.defaultProps = {
  allowContinuous: false,
  anchorEl: null,
  classes: {},
  clearable: false,
  CustomEndAdornment: undefined,
  dateOnly: false,
  disabled: false,
  endDateFieldProps: {},
  endDateRequired: false,
  error: false,
  events: [],
  footerLabel: 'Add',
  fullWidth: true,
  helperText: undefined,
  InputLabelProps: {},
  InputProps: {},
  label: '',
  margin: 'none',
  maxDate: null,
  minDate: null,
  modifiers: null,
  rangeLabels: {
    startDate: 'Start Date',
    endDate: 'End Date',
  },
  startDateFieldProps: {},
  timezone: moment.tz.guess(),
  variant: 'standard',
  verticalRangeFields: false,
};

export default DateTimePickerStateless;
