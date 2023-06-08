import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import { getPublishTime } from './helpers';
import EventStatus from './components/EventStatusIndicator';
import styles from './index.module.css';
import { EventStates } from '../ScheduleComponent/constants';

const TIME_BY_GROUP = (event, userTimezone) => ({
  abTesting: {
    publishTime: getPublishTime(event.testPeriodStart, userTimezone),
    endAt: event.testPeriodTo,
  },
  demonwareEvents: {
    publishTime: getPublishTime(event.publish_at, userTimezone),
    endAt: event.end_at,
  },
  eventManager: {
    publishTime: getPublishTime(event.publish_at, userTimezone),
    endAt: event.end_at,
  },
  externalEvents: {
    publishTime: getPublishTime(event.publish_at, userTimezone),
    endAt: event.end_at,
  },
  informationalEvents: {
    publishTime: getPublishTime(event.publish_at, userTimezone),
    endAt: event.end_at,
  },
});

const EVENT_ENV_TYPE = event => ({
  abTesting: event.environment,
  demonwareEvents: event.env_type,
  eventManager: event.env_type,
  externalEvents: event.env_type,
  informationalEvents: event.env_type,
});

export const CustomCalendarEvent = ({
  classes,
  displayTimeWithTitle,
  event,
  eventsCalendarSettings,
  parentClasses,
  userTimezone,
}) => {
  const { displayView, selectedView } = eventsCalendarSettings;
  const { type, title, task, platforms = [] } = event;
  const { state: taskStatus } = task || {};
  const { publishTime, endAt } = TIME_BY_GROUP(event, userTimezone)[type];

  const hasDayViewPopUp =
    document.getElementsByClassName('dayViewPopUp rbc-overlay').length !== 0;

  const envType = EVENT_ENV_TYPE(event)[type];
  const isCalendarView = displayView === 'calendar';
  const isListView = displayView === 'list';
  const isMonthView = selectedView === 'month' && !hasDayViewPopUp;
  const isExternal = type === 'externalEvents';

  const eventStatusIndProps = {
    classes,
    displayTimeWithTitle,
    envType,
    isCalendarView,
    isListView,
    parentClasses,
    platforms,
    taskStatus,
    type,
  };
  const typographyProps = {
    noWrap: isMonthView,
  };

  const isCancelled = event && event.status === EventStates.Cancelled;

  const publishTimeFormatted = () => {
    const [hour, extra] = publishTime.split(':');
    const [minutes, meridiem] = extra.split(' ');
    const strToNum = num => parseInt(num, 10);

    return `${strToNum(hour)}${
      strToNum(minutes) ? `:${extra}` : ` ${meridiem}`
    }`;
  };

  const displayPublishTime =
    displayTimeWithTitle &&
    isMonthView &&
    publishTime &&
    publishTimeFormatted();

  return (
    <>
      {!isExternal && <EventStatus {...eventStatusIndProps} />}
      <Typography
        {...typographyProps}
        className={classNames(styles.clickableEventText, {
          [styles.clickableEventTextAlignment]: !isCalendarView,
          [styles.titleTextNoEnd]:
            // eslint-disable-next-line no-underscore-dangle
            (!isMonthView || !!endAt || event.__isOverlayEvent) &&
            isCalendarView,
          [styles.cancelledEvent]: isCancelled,
          [styles.extraPadding]: isExternal,
        })}
      >
        {displayPublishTime} {title}
      </Typography>
    </>
  );
};

CustomCalendarEvent.propTypes = {
  classes: PropTypes.object,
  displayTimeWithTitle: PropTypes.bool,
  event: PropTypes.object.isRequired,
  eventsCalendarSettings: PropTypes.shape({
    displayView: PropTypes.string.isRequired,
    selectedView: PropTypes.string.isRequired,
  }).isRequired,
  parentClasses: PropTypes.string,
  userTimezone: PropTypes.string.isRequired,
};

CustomCalendarEvent.defaultProps = {
  classes: {},
  displayTimeWithTitle: true,
  parentClasses: '',
};

const mapStateToProps = state => ({
  eventsCalendarSettings: state.Core.EventsCalendar,
});

export default connect(mapStateToProps)(CustomCalendarEvent);
