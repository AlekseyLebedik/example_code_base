import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import merge from 'lodash/merge';

import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import { Calendar, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { DATE_TIME_FORMATS, dateIsAfter } from 'dw/core/helpers/date-time';

import CustomDefinedRange from '../CustomDefinedRange';
import DateTimeField from '../DateTimeField';
import EventsList from '../EventsList';
import TimePicker from '../TimePicker';

import styles from './index.module.css';

const calendarClasses = {
  monthAndYearWrapper: styles.rdrMonthAndYearWrapper,
  month: styles.rdrMonth,
  monthPicker: styles.rdrMonthPicker,
  yearPicker: styles.rdrYearPicker,
};

const Footer = ({ classes, disabled, label, onClose, onSubmit }) => (
  <div className={classnames(classes.footer, styles.footer)}>
    <Divider />
    <div className={styles.buttonContainer}>
      <Button
        className={!disabled ? styles.primaryButton : styles.button}
        color="primary"
        disabled={disabled}
        onClick={() => !disabled && onSubmit()}
        size="small"
        variant="contained"
      >
        {label}
      </Button>
      <Button
        className={styles.button}
        onClick={onClose}
        size="small"
        variant="contained"
      >
        Cancel
      </Button>
    </div>
  </div>
);

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const WrappedPopper = ({
  allowContinuous,
  anchorEl,
  classes,
  dateFieldCommonProps,
  dateOnly,
  datePickerProps,
  dates,
  endDateFieldProps,
  endDateRequired,
  events,
  focusedRange,
  footerLabel,
  modifiers,
  onClose,
  onSubmit,
  open,
  ranged,
  startDateFieldProps,
  timezone,
}) => {
  const PickerComponent = ranged ? DateRange : Calendar;
  const { minDate, maxDate } = dateFieldCommonProps;
  const { startDate, endDate } = dates;
  const submitDisabled = ranged
    ? !startDate ||
      (minDate && dateIsAfter(minDate, startDate, timezone)) ||
      (endDateRequired && !endDate) ||
      (endDate && dateIsAfter(startDate, endDate, timezone)) ||
      (endDate && maxDate && dateIsAfter(endDate, maxDate, timezone))
    : !startDate || (minDate && dateIsAfter(minDate, startDate, timezone));
  return (
    <Popper
      anchorEl={anchorEl.current}
      className={styles.dialog}
      data-cy="calendar-picker"
      modifiers={merge(WrappedPopper.defaultProps.modifiers, modifiers)}
      open={open}
      placement="bottom-start"
      transition
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <ClickAwayListener onClickAway={onClose}>
            <Paper className={styles.paper} elevation={3}>
              {!datePickerProps.hideSidePanel && (
                <div className={styles.sidebar}>
                  <CustomDefinedRange
                    date={startDate}
                    extraInputRanges={datePickerProps.extraInputRanges}
                    extraStaticRanges={datePickerProps.extraStaticRanges}
                    onChange={datePickerProps.onChange}
                    ranged={ranged}
                    ranges={datePickerProps.ranges}
                  />
                  <EventsList
                    events={events}
                    dates={{ startDate, endDate }}
                    timezone={timezone}
                  />
                </div>
              )}
              <div className={styles.datePickerContainer}>
                <div className={styles.displayTimesContainer}>
                  <div
                    className={classnames({
                      [styles.dateTimeFieldWrapper]: !ranged,
                      [styles.rangedDateTimeFieldWrapper]: ranged,
                    })}
                  >
                    <DateTimeField
                      {...dateFieldCommonProps}
                      {...startDateFieldProps}
                      date={startDate}
                      dateFormat={
                        !dateOnly && DATE_TIME_FORMATS.DEFAULT24_WITH_SECONDS
                      }
                      focused={focusedRange && !focusedRange[1]}
                      hideDateIcon
                      placeholder="Start"
                      type={ranged ? 'startDate' : null}
                      variant="outlined"
                    />
                  </div>
                  {ranged && (
                    <div className={styles.rangedDateTimeFieldWrapper}>
                      <DateTimeField
                        {...dateFieldCommonProps}
                        {...endDateFieldProps}
                        date={endDate}
                        dateFormat={
                          !dateOnly && DATE_TIME_FORMATS.DEFAULT24_WITH_SECONDS
                        }
                        focused={!!focusedRange[1]}
                        hideDateIcon
                        minDate={startDate}
                        placeholder={
                          allowContinuous ? 'Continuous' : 'No End Date'
                        }
                        type="endDate"
                        variant="outlined"
                      />
                    </div>
                  )}
                </div>
                <PickerComponent
                  classNames={calendarClasses}
                  {...datePickerProps}
                />
                {!dateOnly && (
                  <div
                    className={classnames({
                      [styles.timeWrapper]: !ranged,
                      [styles.rangedTimeWrapper]: ranged,
                    })}
                  >
                    <div>
                      {startDate && (
                        <TimePicker
                          date={startDate || ''}
                          maxDate={dateFieldCommonProps.maxDate}
                          minDate={dateFieldCommonProps.minDate}
                          onTimeChange={dateFieldCommonProps.onChange}
                          timezone={dateFieldCommonProps.timezone}
                          type={ranged ? 'startDate' : null}
                        />
                      )}
                    </div>
                    {ranged && endDate && (
                      <TimePicker
                        date={endDate}
                        maxDate={dateFieldCommonProps.maxDate}
                        minDate={startDate}
                        onTimeChange={dateFieldCommonProps.onChange}
                        timezone={dateFieldCommonProps.timezone}
                        type="endDate"
                      />
                    )}
                  </div>
                )}
                {!datePickerProps.hideFooter && (
                  <Footer
                    classes={classes}
                    disabled={submitDisabled}
                    label={footerLabel}
                    onClose={onClose}
                    onSubmit={onSubmit}
                  />
                )}
              </div>
            </Paper>
          </ClickAwayListener>
        </Fade>
      )}
    </Popper>
  );
};

WrappedPopper.propTypes = {
  allowContinuous: PropTypes.bool,
  anchorEl: PropTypes.object,
  classes: PropTypes.object.isRequired,
  dateFieldCommonProps: PropTypes.object.isRequired,
  dateOnly: PropTypes.bool.isRequired,
  datePickerProps: PropTypes.object.isRequired,
  dates: PropTypes.object.isRequired,
  endDateFieldProps: PropTypes.object,
  endDateRequired: PropTypes.bool,
  events: PropTypes.arrayOf(PropTypes.object),
  focusedRange: PropTypes.arrayOf(PropTypes.number),
  footerLabel: PropTypes.string.isRequired,
  modifiers: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  ranged: PropTypes.bool.isRequired,
  startDateFieldProps: PropTypes.object,
  timezone: PropTypes.string.isRequired,
};

WrappedPopper.defaultProps = {
  allowContinuous: false,
  anchorEl: PropTypes.object,
  endDateFieldProps: {},
  endDateRequired: false,
  events: [],
  focusedRange: [],
  modifiers: {
    arrow: { enabled: false },
    flip: { enabled: true },
    hide: { enabled: false },
    preventOverflow: {
      enabled: true,
      boundariesElement: 'viewport',
      padding: 15,
    },
    setMaxHeight: {
      enabled: true,
      order: 890,
      fn: data => {
        return {
          ...data,
          styles: { ...data.styles, maxHeight: '94vh', overflow: 'auto' },
        };
      },
    },
  },
  startDateFieldProps: {},
};

export default WrappedPopper;
