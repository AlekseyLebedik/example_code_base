import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { timestampToMoment } from 'dw/core/helpers/date-time';

import DateTimeCalendarStateless from './presentational';

const TIME_UNITS = ['hour', 'minute', 'second'];

class DateTimeCalendarComponent extends Component {
  state = {
    value: null,
    timezone: this.props.timezone,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value } = nextProps;
    const { timezone } = prevState;
    const selectedDate = timestampToMoment(value, timezone);
    if (selectedDate && !selectedDate.isSame(prevState.value, 'second')) {
      return { value: selectedDate };
    }
    if (!prevState.value) {
      return { value: moment().tz(timezone) };
    }
    return null;
  }

  onChange = selectedDate => this.props.onChange(selectedDate);

  onTimeChange = unit => selectedTime => {
    // eslint-disable-next-line react/no-access-state-in-setstate
    const newDate = moment(this.state.value).set(unit, selectedTime);
    this.setState({ value: newDate }, () => this.onChange(newDate));
  };

  onDateChange = date => {
    const { value } = this.state;
    const newDate = moment(date).startOf('day');
    TIME_UNITS.forEach(unit => newDate.set(unit, value.get(unit)));
    this.setState({ value: newDate }, () => this.onChange(newDate));
  };

  onDateTextChange = date =>
    this.setState({ value: date }, () => this.onChange(date));

  changeTimezoneHandler = timezone => {
    this.setState(state => ({
      timezone,
      value: moment(state.value).tz(timezone),
    }));
  };

  render() {
    const { value } = this.state;
    const { minDate, maxDate, classes, autoOk } = this.props;
    const { timezone } = this.state;

    return (
      <DateTimeCalendarStateless
        value={value}
        onDateTextChange={this.onDateTextChange}
        calendarProps={{ minDate, maxDate, autoOk }}
        onDateChange={this.onDateChange}
        onTimeChange={this.onTimeChange}
        changeTimezoneHandler={this.changeTimezoneHandler}
        timezone={timezone}
        classes={classes}
      />
    );
  }
}

DateTimeCalendarComponent.propTypes = {
  onChange: PropTypes.func,
  timezone: PropTypes.string,
  // eslint-disable-next-line
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object,
  ]),
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
  classes: PropTypes.object,
  autoOk: PropTypes.bool,
};

DateTimeCalendarComponent.defaultProps = {
  timezone: moment.tz.guess(),
  onChange: () => {},
  value: null,
  minDate: null,
  maxDate: null,
  classes: {},
  autoOk: false,
};

export default DateTimeCalendarComponent;
