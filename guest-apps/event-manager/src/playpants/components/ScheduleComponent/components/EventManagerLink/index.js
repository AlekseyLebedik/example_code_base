import React from 'react';
import PropTypes from 'prop-types';
import ConnectedCustomCalendarEvent from 'playpants/components/CustomCalendarEvent';
import { DISPLAY_TIME_WITH_TITLE } from '../../constants';

export const EventManagerLink = ({
  data: { event },
  group: { classes },
  userTimezone,
}) => (
  <ConnectedCustomCalendarEvent
    classes={classes}
    displayTimeWithTitle={!DISPLAY_TIME_WITH_TITLE}
    event={event}
    userTimezone={userTimezone}
  />
);

EventManagerLink.propTypes = {
  data: PropTypes.object.isRequired,
  group: PropTypes.object.isRequired,
  userTimezone: PropTypes.string.isRequired,
};

export default EventManagerLink;
