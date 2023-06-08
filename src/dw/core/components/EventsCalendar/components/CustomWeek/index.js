import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import range from 'lodash/range';
import { connect } from 'react-redux';

import { Navigate } from '@demonware/ct-react-big-calendar';
import TimeGrid from '@demonware/ct-react-big-calendar/lib/TimeGrid';

import { formatDateTime } from 'dw/core/helpers/date-time';

export class CustomWeek extends Component {
  static navigate = (date, action, props) => {
    const { eventsCalendarSettings, userTimezone } = props;
    const { numberOfDays } = eventsCalendarSettings;

    switch (action) {
      case Navigate.PREVIOUS:
        return moment(date).tz(userTimezone).subtract(numberOfDays, 'day');

      case Navigate.NEXT:
        return moment(date).tz(userTimezone).add(numberOfDays, 'day');

      default:
        return date;
    }
  };

  static title = date => formatDateTime(date, 'MMMM D, YYYY');

  range = (date, numDays, customViewOn, userTimezone, view) => {
    const current =
      customViewOn || view === 'day'
        ? moment(date).tz(userTimezone).startOf('day').subtract(1, 'day')
        : moment(date)
            .tz(userTimezone)
            .startOf('day')
            .day(0)
            .subtract(1, 'day');
    return range(0, numDays).map(() => current.add(1, 'day').toDate());
  };

  render() {
    const { eventsCalendarSettings, userTimezone } = this.props;
    const { customViewOn, numberOfDays, selectedDay, selectedView } =
      eventsCalendarSettings;
    const weekRange = this.range(
      selectedDay,
      numberOfDays,
      customViewOn,
      userTimezone,
      selectedView
    );

    return (
      <TimeGrid
        {...this.props}
        eventOffset={15}
        navigate={this.navigate}
        range={weekRange}
        title={this.title}
      />
    );
  }
}

CustomWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  eventsCalendarSettings: PropTypes.object.isRequired,
  userTimezone: PropTypes.string.isRequired,
};
export default connect(state => ({
  eventsCalendarSettings: state.Core.EventsCalendar,
}))(CustomWeek);
