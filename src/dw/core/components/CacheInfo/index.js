/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { formatDateTime as formatDateTimeDefault } from 'dw/core/helpers/date-time';

const UPDATE_INTERVAL = 30 * 1000;

const format = (timestamp, formatDateTime) =>
  `${formatDateTime(timestamp)} (${moment
    .duration(timestamp - moment().unix(), 'seconds')
    .humanize(true)})`;

class CacheInfo extends Component {
  state = {
    timestamp: null,
    formatted: null,
  };

  static getDerivedStateFromProps(props, state) {
    const { timestamp, formatDateTime } = props;
    if (timestamp !== state.timestamp) {
      return {
        timestamp,
        formatted: format(timestamp, formatDateTime),
      };
    }
    return null;
  }

  componentDidMount() {
    this.intervalId = setInterval(this.update, UPDATE_INTERVAL);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  update = () => {
    const { timestamp, formatDateTime } = this.props;
    this.setState(state => {
      const formatted = format(timestamp, formatDateTime);
      return state.formatted !== formatted ? { formatted } : null;
    });
  };

  render() {
    return <div>{this.state.formatted}</div>;
  }
}

CacheInfo.propTypes = {
  timestamp: PropTypes.number,
  formatDateTime: PropTypes.func,
};

CacheInfo.defaultProps = {
  timestamp: moment().unix(),
  formatDateTime: formatDateTimeDefault,
};

export default CacheInfo;
