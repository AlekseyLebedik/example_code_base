import React from 'react';
import PropTypes from 'prop-types';
import { getNowTimestamp } from 'playpants/helpers/dateTime';

import DateStateless from './presentational';

const Date = props => {
  const { eventData: event, type, onSave: saveDate } = props;

  const onSave = e => saveDate(type, e === '' ? null : e.unix());

  const newProps = {
    ...props,
    clearable: props.clearable && !props.detachedEvent,
    date: event[type],
    maxDate: type === 'publish_at' ? event.end_at : null,
    minDate: type === 'publish_at' ? getNowTimestamp() : event.publish_at,
    onSave,
  };

  return <DateStateless {...newProps} />;
};

Date.propTypes = {
  clearable: PropTypes.bool,
  detachedEvent: PropTypes.bool.isRequired,
  eventData: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
Date.defaultProps = {
  clearable: false,
};

export default Date;
