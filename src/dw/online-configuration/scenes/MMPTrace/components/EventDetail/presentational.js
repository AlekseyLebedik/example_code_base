import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import JSONTree from 'dw/core/components/JSONTree';

import BarChart from './components/BarChart';
import { PLAYER_SEARCH_STARTED, PARTY_SEARCH_STARTED } from '../../constants';

import styles from './presentational.module.css';

const EventDetail = props => {
  if (!props.eventId) return null;

  const { eventType, dataCenterQosResults, data, servers } = props;
  return (
    <div className={classNames('event-detail', styles.container)}>
      {(eventType === PLAYER_SEARCH_STARTED ||
        eventType === PARTY_SEARCH_STARTED) && (
        <BarChart data={dataCenterQosResults} servers={servers} />
      )}
      <JSONTree key={props.eventId} data={data} searchable />
    </div>
  );
};

EventDetail.propTypes = {
  eventId: PropTypes.string,
  eventType: PropTypes.string.isRequired,
  dataCenterQosResults: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  servers: PropTypes.object.isRequired,
};

EventDetail.defaultProps = {
  eventId: null,
};

EventDetail.defaultProps = {
  eventId: null,
};

export default EventDetail;
