import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment-timezone';

import ToolbarStateless from './presentational';

export class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customRangeError: '',
      customRangeInput: props.eventsCalendarSettings.numberOfDays,
    };
  }

  componentDidUpdate(prevProps) {
    const { customViewOn, numberOfDays } = this.props.eventsCalendarSettings;
    if (prevProps.eventsCalendarSettings.numberOfDays !== numberOfDays) {
      this.changeNumberOfDays(numberOfDays, customViewOn);
    }
  }

  onNavigate = (action, newDate) => {
    const { eventsCalendarSettings, navigateCalendar, userTimezone } =
      this.props;
    const { numberOfDays, selectedDay } = eventsCalendarSettings;

    let updatedSelectedDay;
    switch (action) {
      case 'PREV':
        updatedSelectedDay = moment(selectedDay)
          .tz(userTimezone)
          .subtract(numberOfDays, 'day');
        break;
      case 'NEXT':
        updatedSelectedDay = moment(selectedDay)
          .tz(userTimezone)
          .add(numberOfDays, 'day');
        break;
      case 'DATE':
        updatedSelectedDay = moment(newDate).tz(userTimezone);
        break;
      default:
        updatedSelectedDay = moment().tz(userTimezone);
        break;
    }

    navigateCalendar(updatedSelectedDay);
  };

  setCustomRange = (customRangeError, customRangeInput) =>
    this.setState({ customRangeError, customRangeInput });

  setNonCustomDays = view => {
    const { eventsCalendarSettings, setCalendarSettings } = this.props;
    const { selectedDay } = eventsCalendarSettings;

    let numberOfDays = 1;
    if (view === 'week') {
      numberOfDays = 7;
    } else if (view === 'month') {
      numberOfDays = selectedDay.daysInMonth();
    }
    setCalendarSettings({
      customViewOn: false,
      numberOfDays,
      selectedView: view,
    });
    this.setCustomRange('', numberOfDays);
  };

  changeNumberOfDays = (value, customViewOn = true) => {
    const { views } = this.props;
    const numValue = Number(value);
    const dayInViews = views.day;
    const weekInViews = views.week;
    let minNumberDays = 1;
    if (!dayInViews) minNumberDays = 2;
    if (!weekInViews) minNumberDays = 10;

    if (value !== '' && numValue > minNumberDays - 1 && numValue < 101) {
      let updatedView = 'month';
      if (numValue <= 1 && dayInViews) {
        updatedView = 'day';
      } else if (numValue > 1 && numValue < 10 && weekInViews) {
        updatedView = 'week';
      }
      this.props.setCalendarSettings({
        customViewOn,
        numberOfDays: numValue,
        selectedView: updatedView,
      });
      this.setCustomRange('', value);
    } else {
      this.setCustomRange(`Must be ${minNumberDays}-100`, value);
    }
  };

  render() {
    const newProps = {
      ...this.props,
      ...this.state,
      changeNumberOfDays: this.changeNumberOfDays,
      onNavigate: this.onNavigate,
      setNonCustomDays: this.setNonCustomDays,
    };

    return <ToolbarStateless {...newProps} />;
  }
}

Toolbar.propTypes = {
  eventsCalendarSettings: PropTypes.shape({
    selectedDay: PropTypes.object,
    customViewOn: PropTypes.bool.isRequired,
    numberOfDays: PropTypes.number.isRequired,
  }).isRequired,
  navigateCalendar: PropTypes.func.isRequired,
  onFetchEvents: PropTypes.func.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
  userTimezone: PropTypes.string.isRequired,
  views: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  eventsCalendarSettings: state.Core.EventsCalendar,
});

export default connect(mapStateToProps)(Toolbar);
