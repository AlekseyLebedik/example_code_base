import { Component } from 'react';
import PropTypes from 'prop-types';
import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import { hasData } from 'dw/core/helpers/object';

import { getAccounts } from 'dw/online-configuration/services/accounts';
import { userIdSelector } from 'dw/online-configuration/scenes/Accounts/selectors';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

import * as Actions from './actions';
import ConnectionLogsStatelessComponent from './presentational';

const stateToProps = (state, props) => ({
  userID:
    state.Scenes.Security.Anticheat.Whitelist.ConnectionLogs.ByUser.userID ||
    props.match.params.userID,
  ascending:
    state.Scenes.Security.Anticheat.Whitelist.ConnectionLogs.ByUser.ascending,
  apiCallFunc: input => getAccounts({ q: input }),
  renderOptionFunc: item => `${item.userName} | ${item.userID}`,
  formatDateTime: formatDateTimeSelector(state),
});

const dispatchToProps = dispatch => ({
  onSearch: (params, append) =>
    dispatch(Actions.fetchConnectionLogs(params, append)),
  changeUserID: userID => dispatch(Actions.changeUserID(userID)),
  changeAscending: ascending => dispatch(Actions.changeAscending(ascending)),
});

const initialState = props => ({
  ascending: props.ascending,
  userID: props.userID || null,
});

class ConnectionLogs extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (nextProps.ascending !== prevState.ascending) {
      newState.ascending = nextProps.ascending;
    }
    if (userIdSelector(nextProps.userID) !== userIdSelector(prevState.userID)) {
      newState.userID = nextProps.userID;
    }
    if (hasData(newState)) {
      return newState;
    }
    return null;
  }

  state = initialState(this.props);

  onLoadData = ({ nextPageToken, successCallback, failCallback } = {}) => {
    const { ascending, userID } = this.state;
    if (!userID) {
      successCallback([], nextPageToken);
      return;
    }

    const append = !!nextPageToken;
    const params = {
      successCallback,
      failCallback,
      nextPageToken,
      userID: userIdSelector(userID),
      ascending,
    };
    this.props.onSearch(params, append);
  };

  changeUserID = userID => {
    this.changeHistory(userID);
    this.props.changeUserID(userID);
  };

  changeHistory(value) {
    const userID = userIdSelector(value);
    const { history, match } = this.props;
    const url =
      match.params.userID === undefined
        ? joinPath(match.url, userID)
        : match.path.replace(':userID', userID);
    history.replace(url);
  }

  render() {
    return (
      <ConnectionLogsStatelessComponent
        baseUrl={this.props.baseUrl}
        userID={this.state.userID}
        updateTime={this.state.updateTime}
        renderOptionFunc={this.props.renderOptionFunc}
        apiCallFunc={this.props.apiCallFunc}
        formatDateTime={this.props.formatDateTime}
        changeUserID={this.changeUserID}
        onLoadData={this.onLoadData}
      />
    );
  }
}

ConnectionLogs.propTypes = {
  userID: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  ascending: PropTypes.bool.isRequired,
  onSearch: PropTypes.func.isRequired,
  changeUserID: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  baseUrl: PropTypes.string.isRequired,
  formatDateTime: PropTypes.func.isRequired,
  apiCallFunc: PropTypes.func.isRequired,
  renderOptionFunc: PropTypes.func.isRequired,
};
ConnectionLogs.defaultProps = {
  userID: undefined,
};

export default connect(stateToProps, dispatchToProps, ConnectionLogs);
