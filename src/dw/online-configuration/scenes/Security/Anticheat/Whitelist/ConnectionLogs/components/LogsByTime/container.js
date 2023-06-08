import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dw/core/helpers/component';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import { fetchConnectionLogs } from './actions';
import ConnectionLogsStatelessComponent from './presentational';

const stateToProps = state => ({
  formatDateTime: formatDateTimeSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: (params, append) => dispatch(fetchConnectionLogs(params, append)),
});

class ConnectionLogs extends Component {
  state = {
    ascending: false,
    updateTime: Math.round(Date.now().valueOf() / 1000),
    dateTo: null,
  };

  onLoadData = (props = {}) => {
    const { nextPageToken, successCallback, failCallback } = props;
    const { ascending, updateTime, dateTo } = this.state;
    const delta = ascending ? 0 : 24 * 60 * 60 - 1;
    const append = !!nextPageToken;
    const params = {
      nextPageToken,
      ascending,
      updateTime: updateTime ? updateTime + delta : null,
      dateTo,
      successCallback,
      failCallback,
    };
    this.props.onLoad(params, append);
  };

  handleChange = (fieldName, newValue) => {
    const updates = {};
    updates[fieldName] = newValue;
    this.setState({ ...updates });
  };

  render() {
    return (
      <ConnectionLogsStatelessComponent
        baseUrl={this.props.baseUrl}
        ascending={this.state.ascending}
        updateTime={this.state.updateTime}
        dateTo={this.state.dateTo}
        handleChange={this.handleChange}
        onLoadData={this.onLoadData}
        formatDateTime={this.props.formatDateTime}
      />
    );
  }
}

ConnectionLogs.propTypes = {
  onLoad: PropTypes.func.isRequired,
  baseUrl: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, ConnectionLogs);
