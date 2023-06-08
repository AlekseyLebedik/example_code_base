import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

const customHumanizedDuration = (endAt, publishAt) => {
  const endAtMoment = moment(endAt);
  const publishAtMoment = moment(publishAt);
  let humanizedDuration = '---';
  if (endAt) {
    const duration = moment.duration(
      endAtMoment.diff(publishAtMoment),
      'seconds'
    );
    const days = Math.floor(duration.asDays());
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();
    const ifDays = days > 0 ? `${days}d` : '';
    const ifHours = hours > 0 ? ` ${hours}h` : '';
    const ifMinutes = minutes > 0 ? ` ${minutes}m` : '';
    const ifSeconds = seconds > 0 ? ` ${seconds}s` : '';
    humanizedDuration = ifDays + ifHours + ifMinutes + ifSeconds;
  }
  return humanizedDuration;
};

const Duration = ({ eventData }) => {
  const { end_at: endAt, publish_at: publishAt } = eventData;

  const value = customHumanizedDuration(endAt, publishAt);

  return <TextField label="Duration" fullWidth value={value} disabled />;
};

Duration.propTypes = {
  eventData: PropTypes.object.isRequired,
};

export default Duration;
