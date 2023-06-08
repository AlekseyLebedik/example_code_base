import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { timestampToMoment } from 'dw/core/helpers/date-time';

import CalendarStateless from './presentational';

class CalendarComponent extends Component {
  state = {
    currentDate: null,
    selectedDate: null,
    timezone: this.props.timezone,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { value, timezone } = nextProps;
    const selectedDate = timestampToMoment(value, timezone);

    if (
      selectedDate &&
      (!selectedDate.isSame(prevState.selectedDate, 'day') ||
        timezone !== prevState.timezone)
    ) {
      return {
        currentDate: selectedDate,
        selectedDate,
        timezone,
      };
    }
    if (!prevState.currentDate) {
      return { currentDate: moment().tz(timezone) };
    }

    return null;
  }

  componentDidUpdate(_, prevState) {
    const { onMonthChange } = this.props;
    const { currentDate } = this.state;
    if (!currentDate.isSame(prevState.currentDate, 'month') && onMonthChange) {
      onMonthChange(moment(currentDate.startOf('month')));
    }
  }

  onChange = selectedDate => {
    this.setState({ currentDate: selectedDate, selectedDate }, () =>
      this.props.onChange(selectedDate)
    );
  };

  backMonthHandler = () => {
    const { minDate, onChange, autoOk } = this.props;
    const newSelectedDate = moment(this.state.selectedDate).subtract(
      1,
      'month'
    );
    let setNewSelectedDate = true;
    if (minDate) {
      setNewSelectedDate = newSelectedDate.isAfter(
        this.minMaxDateToMoment(minDate),
        'day'
      );
    }
    this.setState(
      state => ({
        currentDate: moment(state.currentDate).subtract(1, 'month'),
      }),
      () => (!autoOk && setNewSelectedDate ? onChange(newSelectedDate) : null)
    );
  };

  forwardMonthHandler = () => {
    const { maxDate, onChange, autoOk } = this.props;
    const newSelectedDate = moment(this.state.selectedDate).add(1, 'month');
    let setNewSelectedDate = true;
    if (maxDate) {
      setNewSelectedDate = newSelectedDate.isBefore(
        this.minMaxDateToMoment(maxDate),
        'day'
      );
    }
    this.setState(
      state => ({
        currentDate: moment(state.currentDate).add(1, 'month'),
      }),
      () => (!autoOk && setNewSelectedDate ? onChange(newSelectedDate) : null)
    );
  };

  changeMonthHandler = month => {
    const { minDate, maxDate, onChange, autoOk } = this.props;
    const newSelectedDate = moment(this.state.selectedDate).set('month', month);
    let setNewSelectedDate = true;
    if (minDate) {
      setNewSelectedDate = newSelectedDate.isAfter(
        this.minMaxDateToMoment(minDate),
        'day'
      );
    }
    if (setNewSelectedDate && maxDate) {
      setNewSelectedDate = newSelectedDate.isBefore(
        this.minMaxDateToMoment(maxDate),
        'day'
      );
    }
    this.setState(
      state => ({
        currentDate: moment(state.currentDate).set('month', month),
      }),
      () => (!autoOk && setNewSelectedDate ? onChange(newSelectedDate) : null)
    );
  };

  changeYearHandler = year => {
    const { minDate, maxDate, onChange, autoOk } = this.props;
    const newSelectedDate = moment(this.state.selectedDate).set('year', year);
    let setNewSelectedDate = true;
    if (minDate) {
      setNewSelectedDate = newSelectedDate.isAfter(
        this.minMaxDateToMoment(minDate),
        'day'
      );
    }
    if (setNewSelectedDate && maxDate) {
      setNewSelectedDate = newSelectedDate.isBefore(
        this.minMaxDateToMoment(maxDate),
        'day'
      );
    }
    this.setState(
      state => ({
        currentDate: moment(state.currentDate).set('year', year),
      }),
      () => (!autoOk && setNewSelectedDate ? onChange(newSelectedDate) : null)
    );
  };

  minMaxDateToMoment = date => {
    if (date) {
      const { timezone } = this.props;
      return date === 'now'
        ? moment().tz(timezone)
        : timestampToMoment(date).tz(timezone);
    }
    return null;
  };

  render() {
    const { currentDate, selectedDate } = this.state;
    const { minDate, maxDate, classes, renderDay, timezone } = this.props;

    return (
      <CalendarStateless
        currentDate={currentDate}
        selectedDate={selectedDate}
        backMonthHandler={this.backMonthHandler}
        forwardMonthHandler={this.forwardMonthHandler}
        changeMonthHandler={this.changeMonthHandler}
        changeYearHandler={this.changeYearHandler}
        onChange={this.onChange}
        minDate={this.minMaxDateToMoment(minDate)}
        maxDate={this.minMaxDateToMoment(maxDate)}
        classes={classes}
        renderDay={renderDay}
        timezone={timezone}
      />
    );
  }
}

CalendarComponent.propTypes = {
  onChange: PropTypes.func,
  onMonthChange: PropTypes.func,
  renderDay: PropTypes.func,
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

CalendarComponent.defaultProps = {
  timezone: moment.tz.guess(),
  onChange: () => {},
  onMonthChange: undefined,
  renderDay: undefined,
  value: null,
  minDate: null,
  maxDate: null,
  classes: {},
  autoOk: false,
};

export default CalendarComponent;
