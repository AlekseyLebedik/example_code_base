import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import { DATE_TIME_FORMATS, formatDateTime } from 'dw/core/helpers/date-time';
import {
  eventsAreSameDay,
  eventDatesAreClose,
  timestampInRange,
} from './helpers';

import styles from './index.module.css';

const Header = () => (
  <div className={styles.header}>
    <div className={styles.headerBorder} />
    <span className={styles.headerTitle}>Events</span>
    <div className={styles.headerBorder} />
  </div>
);

const Event = ({ event, timezone }) => (
  <div className={styles.event}>
    <Icon className={styles.eventDot} />
    {event.title}
    <div className={styles.eventDate}>
      <Tooltip
        title={
          <>
            <div>
              From:{' '}
              {formatDateTime(event.start, DATE_TIME_FORMATS.DEFAULT, timezone)}
            </div>
            <div>
              To:{' '}
              {formatDateTime(event.end, DATE_TIME_FORMATS.DEFAULT, timezone)}
            </div>
          </>
        }
      >
        <span>
          {formatDateTime(
            event.start,
            DATE_TIME_FORMATS.DEFAULT_DATE,
            timezone
          )}
          {event.end &&
            !eventsAreSameDay(event, timezone) &&
            ` - ${formatDateTime(
              event.end,
              DATE_TIME_FORMATS.DEFAULT_DATE,
              timezone
            )}`}
        </span>
      </Tooltip>
    </div>
  </div>
);

Event.propTypes = {
  event: PropTypes.object.isRequired,
  timezone: PropTypes.string.isRequired,
};

const EventsList = ({
  dates: { startDate, endDate },
  events = [],
  timezone,
}) => {
  const filteredEvents = useMemo(
    () =>
      events.filter(e =>
        endDate
          ? timestampInRange(e.start, startDate, endDate) ||
            timestampInRange(e.end, startDate, endDate) ||
            timestampInRange(startDate, e.start, e.end) ||
            timestampInRange(endDate, e.start, e.end) ||
            eventDatesAreClose(e, startDate, timezone) ||
            eventDatesAreClose(e, endDate, timezone)
          : eventDatesAreClose(e, startDate, timezone) ||
            timestampInRange(startDate, e.start, e.end)
      ),
    [startDate, endDate, events, timezone]
  );
  return filteredEvents.length ? (
    <div className={styles.eventsList}>
      <Header />
      {filteredEvents.map(e => (
        <Event event={e} timezone={timezone} />
      ))}
    </div>
  ) : null;
};

EventsList.propTypes = {
  dates: PropTypes.shape({
    startDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
    endDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(Date),
    ]),
  }).isRequired,
  events: PropTypes.arrayOf(PropTypes.object),
  timezone: PropTypes.string.isRequired,
};
EventsList.defaultProps = { events: [] };

export default EventsList;
