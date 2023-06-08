import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';
import classNames from 'classnames';

import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Divider from '@material-ui/core/Divider';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import {
  DATE_TIME_FORMATS,
  timestampToMoment,
  timezoneOrDefaultSelector,
} from 'dw/core/helpers/date-time';
import Calendar from 'dw/core/components/Calendar';
import DateTimeCalendar from 'dw/core/components/DateTimeCalendar';

import styles from './index.module.css';

const Header = ({ label, classes }) => (
  <div className={classNames(classes.header, styles.header)}>
    {label}
    <Divider />
  </div>
);

Header.propTypes = {
  label: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
};

const Footer = ({ label, onSubmit, onClose, classes }) => (
  <div className={classNames(classes.footer, styles.footer)}>
    <Divider />
    <div className={styles.buttonContainer}>
      <Button
        variant="contained"
        className={styles.button}
        color="primary"
        onClick={onSubmit}
        size="small"
      >
        {label}
      </Button>
      <Button
        variant="contained"
        className={styles.button}
        onClick={onClose}
        size="small"
      >
        Cancel
      </Button>
    </div>
  </div>
);

Footer.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
};

const WrappedPopper = ({
  open,
  anchorEl,
  onSubmit,
  onClose,
  label,
  footerLabel,
  onDateTimeChange,
  dateTimeProps,
  dateOnly,
  classes,
  modifiers,
}) => {
  const PickerComponent = dateOnly ? Calendar : DateTimeCalendar;
  return (
    <Popper
      className={styles.dialog}
      open={open}
      anchorEl={anchorEl}
      placement="bottom-start"
      data-cy="calendar-picker"
      transition
      modifiers={{ ...WrappedPopper.defaultProps.modifiers, ...modifiers }}
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <ClickAwayListener onClickAway={onClose}>
            <Paper className={styles.paper}>
              <Header label={label} classes={classes} />
              <PickerComponent
                onChange={onDateTimeChange}
                {...dateTimeProps}
                classes={classes}
              />
              <Footer
                label={footerLabel}
                onSubmit={onSubmit}
                onClose={onClose}
                classes={classes}
              />
            </Paper>
          </ClickAwayListener>
        </Fade>
      )}
    </Popper>
  );
};

WrappedPopper.propTypes = {
  anchorEl: PropTypes.object,
  classes: PropTypes.object.isRequired,
  dateOnly: PropTypes.bool.isRequired,
  dateTimeProps: PropTypes.object.isRequired,
  footerLabel: PropTypes.string,
  label: PropTypes.string.isRequired,
  modifiers: PropTypes.object,
  onClose: PropTypes.func.isRequired,
  onDateTimeChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

WrappedPopper.defaultProps = {
  footerLabel: '',
  anchorEl: PropTypes.object,
  modifiers: {
    preventOverflow: {
      enabled: true,
    },
    hide: {
      enabled: false,
    },
  },
};

class DateTimePicker extends Component {
  state = {
    open: false,
    anchorEl: null,
    selectedDate: null,
    prevPropsValue: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, timezone } = nextProps;
    const selectedDate = timestampToMoment(value, timezone);
    if (prevState.prevPropsValue !== value) {
      if (
        selectedDate &&
        !selectedDate.isSame(prevState.selectedDate, 'second')
      ) {
        return { selectedDate, prevPropsValue: value };
      }
      return { prevPropsValue: value };
    }
    if (!prevState.selectedDate) {
      return { selectedDate: moment().tz(timezone) };
    }
    return null;
  }

  componentDidMount() {
    const { cleared, onChange } = this.props;
    if (cleared) onChange('');
  }

  onClick = e => {
    const { currentTarget } = e;
    this.setState({
      anchorEl: currentTarget,
      open: true,
    });
  };

  onClose = () => this.setState({ open: false });

  onSubmit = () => {
    const { selectedDate } = this.state;
    const { returnTimestamp, minDate, maxDate, timezone } = this.props;

    if (
      !selectedDate.isBefore(timestampToMoment(minDate, timezone)) &&
      !selectedDate.isAfter(timestampToMoment(maxDate, timezone))
    ) {
      this.onClose();
      this.props.onChange(returnTimestamp ? selectedDate.unix() : selectedDate);
    }
  };

  onDateTimeChange = selectedDate => {
    const { autoOk } = this.props;
    this.setState({ selectedDate }, () => (autoOk ? this.onSubmit() : null));
  };

  clearValue = e => {
    e.stopPropagation();
    this.props.onChange('');
  };

  render() {
    const { selectedDate, open, anchorEl } = this.state;
    const {
      value,
      label,
      footerLabel,
      timezone,
      clearable,
      error,
      helperText,
      disabled,
      minDate,
      maxDate,
      autoOk,
      dateOnly,
      classes,
      InputProps,
      InputLabelProps,
      fullWidth,
      margin,
      modifiers,
      CustomEndAdornment,
      variant,
    } = this.props;

    const valueFormat = dateOnly
      ? DATE_TIME_FORMATS.DEFAULT_DATE
      : DATE_TIME_FORMATS.DEFAULT;
    return (
      <>
        <TextField
          value={
            value ? timestampToMoment(value, timezone).format(valueFormat) : ''
          }
          variant={variant}
          label={label}
          onClick={this.onClick}
          fullWidth={fullWidth}
          error={error}
          helperText={helperText}
          disabled={disabled}
          margin={margin}
          InputProps={{
            ...InputProps,
            endAdornment:
              clearable &&
              value &&
              !disabled &&
              (CustomEndAdornment ? (
                <CustomEndAdornment clearValue={this.clearValue} />
              ) : (
                <InputAdornment position="end">
                  <IconButton onClick={this.clearValue}>
                    <Icon fontSize="small">clear</Icon>
                  </IconButton>
                </InputAdornment>
              )),
          }}
          InputLabelProps={InputLabelProps}
          className={classNames(classes.input)}
        />
        <WrappedPopper
          open={!disabled && open}
          anchorEl={anchorEl}
          label={label}
          footerLabel={footerLabel}
          onClose={this.onClose}
          onSubmit={this.onSubmit}
          onDateTimeChange={this.onDateTimeChange}
          dateTimeProps={{
            value: selectedDate,
            timezone,
            minDate,
            maxDate,
            autoOk,
          }}
          dateOnly={dateOnly}
          classes={classes}
          modifiers={modifiers}
        />
      </>
    );
  }
}

DateTimePicker.propTypes = {
  label: PropTypes.string,
  footerLabel: PropTypes.string,
  timezone: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  onChange: PropTypes.func,
  returnTimestamp: PropTypes.bool,
  clearable: PropTypes.bool,
  cleared: PropTypes.bool,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
  dateOnly: PropTypes.bool,
  autoOk: PropTypes.bool,
  classes: PropTypes.object,
  InputProps: PropTypes.object,
  InputLabelProps: PropTypes.object,
  fullWidth: PropTypes.bool,
  margin: PropTypes.string,
  variant: PropTypes.string,
  modifiers: PropTypes.object,
  CustomEndAdornment: PropTypes.object,
};

DateTimePicker.defaultProps = {
  label: '',
  footerLabel: 'Add',
  value: null,
  timezone: moment.tz.guess(),
  onChange: () => {},
  returnTimestamp: false,
  clearable: false,
  cleared: false,
  disabled: false,
  error: false,
  helperText: undefined,
  minDate: null,
  maxDate: null,
  dateOnly: false,
  autoOk: false,
  classes: {},
  InputProps: {},
  InputLabelProps: {},
  fullWidth: true,
  variant: 'standard',
  margin: 'none',
  modifiers: null,
  CustomEndAdornment: undefined,
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
  meta: {},
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
