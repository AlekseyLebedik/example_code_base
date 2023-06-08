import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Downshift from 'downshift';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';

import {
  DATE_TIME_FORMATS,
  timestampToMoment,
} from 'dw/core/helpers/date-time';

import styles from './index.module.css';

const FAVOURITE_TIMEZONES = ['Europe/Dublin', 'America/Vancouver', 'UTC'];

const Select = ({ timezone, onClick }) => (
  <Tooltip title="Quick Timezone Change">
    <span onClick={onClick} className={styles.selectText}>
      {moment.tz(timezone).format('z')}
    </span>
  </Tooltip>
);

Select.propTypes = {
  timezone: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export class DateTextBase extends Component {
  state = {
    value: null,
    oldValue: null,
    valid: false,
    prevPropsValue: null,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    if (prevState.prevPropsValue !== value) {
      const newValue = value.format(DATE_TIME_FORMATS.DEFAULT_WITHOUT_TIMEZONE);
      return {
        value: newValue,
        oldValue: newValue,
        valid: true,
        prevPropsValue: value,
      };
    }
    return null;
  }

  onChange = e => {
    const { value } = e.target;
    this.setState({ value });
  };

  onKeyPress = e => {
    if (e.keyCode === 13) {
      this.setValue(e);
    }
  };

  onFocus = e => {
    const { target } = e;
    target.select();
  };

  setValue = e => {
    const { timezone, onDateTextChange, minDate, maxDate } = this.props;
    const { value } = e.target;
    const newDate = moment.tz(
      value,
      DATE_TIME_FORMATS.DEFAULT_WITHOUT_TIMEZONE,
      timezone
    );
    let valid = newDate.isValid();
    if (
      valid &&
      minDate &&
      newDate.isBefore(this.minMaxDateToMoment(minDate, timezone), 'minute')
    ) {
      valid = false;
    }
    if (
      valid &&
      maxDate &&
      newDate.isAfter(this.minMaxDateToMoment(maxDate, timezone), 'minute')
    ) {
      valid = false;
    }

    if (valid) {
      const newDateFormatted = newDate.format(
        DATE_TIME_FORMATS.DEFAULT_WITHOUT_TIMEZONE
      );
      if (newDateFormatted !== this.state.oldValue) {
        this.setState(
          { value: newDateFormatted, oldValue: newDateFormatted },
          () => onDateTextChange(newDate)
        );
      }
    }
    this.setState({ valid });
  };

  minMaxDateToMoment = (date, timezone) =>
    date === 'now'
      ? moment().tz(timezone)
      : timestampToMoment(date).tz(timezone);

  render() {
    const { value, valid } = this.state;
    const { classes, timezone, changeTimezoneHandler } = this.props;
    if (!FAVOURITE_TIMEZONES.includes(timezone)) {
      FAVOURITE_TIMEZONES.push(timezone);
    }
    return (
      <TextField
        value={value}
        fullWidth
        onChange={this.onChange}
        onKeyDown={this.onKeyPress}
        onBlur={this.setValue}
        onFocus={this.onFocus}
        error={!valid}
        className={styles.dateText}
        InputProps={{
          className: classes.dateText,
          endAdornment: (
            <InputAdornment position="end">
              <Downshift selectedItem={timezone}>
                {({ isOpen, selectedItem, toggleMenu, closeMenu }) => (
                  <div styles={styles.downshiftContainer}>
                    <Select onClick={toggleMenu} timezone={timezone} />
                    {isOpen ? (
                      <Paper square className={styles.paper}>
                        {FAVOURITE_TIMEZONES.map(tz => (
                          <MenuItem
                            key={tz}
                            selected={tz === selectedItem}
                            onClick={e => {
                              changeTimezoneHandler(e.target.textContent);
                              closeMenu();
                            }}
                            className={styles.item}
                          >
                            {tz}
                          </MenuItem>
                        ))}
                      </Paper>
                    ) : null}
                  </div>
                )}
              </Downshift>
            </InputAdornment>
          ),
        }}
        autoFocus
      />
    );
  }
}

DateTextBase.propTypes = {
  // eslint-disable-next-line
  value: PropTypes.object.isRequired,
  timezone: PropTypes.string.isRequired,
  onDateTextChange: PropTypes.func.isRequired,
  changeTimezoneHandler: PropTypes.func.isRequired,
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
  classes: PropTypes.object.isRequired,
};

DateTextBase.defaultProps = {
  minDate: null,
  maxDate: null,
};

const DateTextStyled = withStyles(theme => ({
  dateText: {
    color: theme.palette.grey['600'],
  },
}))(DateTextBase);

export default DateTextStyled;
