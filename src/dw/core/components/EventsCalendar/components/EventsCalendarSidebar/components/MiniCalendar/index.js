import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Calendar from 'dw/core/components/Calendar';

import styles from './index.module.css';

export class MiniCalendar extends Component {
  toRenderDot = () => <div className={styles.miniCalendarDots}>&#8729;</div>;

  renderDay = (props, day) => (
    <div {...props}>
      {day.date()}
      {this.props.daysWithDots.hasOwnProperty(day) ? this.toRenderDot() : null}
    </div>
  );

  render() {
    const { classes, selectedDay, userTimezone } = this.props;
    return (
      <Calendar
        classes={{ ...classes, calendar: styles.calendar }}
        onChange={this.props.navigateCalendar}
        renderDay={this.renderDay}
        timezone={userTimezone}
        value={selectedDay}
      />
    );
  }
}

MiniCalendar.propTypes = {
  classes: PropTypes.object,
  daysWithDots: PropTypes.object.isRequired,
  navigateCalendar: PropTypes.func.isRequired,
  selectedDay: PropTypes.object.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

MiniCalendar.defaultProps = {
  classes: {},
};

export default MiniCalendar;
