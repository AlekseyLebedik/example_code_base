import { Component } from 'react';
import PropTypes from 'prop-types';
import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import { hasData } from 'dw/core/helpers/object';
import { getAccounts } from 'dw/online-configuration/services/accounts';
import { userIdSelector } from 'dw/online-configuration/scenes/Accounts/selectors';

import * as Actions from './actions';
import { anticheatStatisticsSelector } from './selectors';
import * as filterSelectors from '../../selectors';
import * as filterActions from '../../actions';
import AnticheatStatisticsStatelessComponent from './presentational';

const apiCallFunc = input => getAccounts({ q: input });
const renderOptionFunc = item => `${item.userName} | ${item.userID}`;

const stateToProps = state => ({
  anticheatStatistics: anticheatStatisticsSelector(state),
  nextPageToken:
    state.Scenes.Security.Anticheat.AnticheatStatistics.ByDate.nextPageToken,
  userID: filterSelectors.userIdSelector(state),
  challengeId: filterSelectors.challengeIdSelector(state),
});

const dispatchToProps = dispatch => ({
  onSearch: (params, append) =>
    dispatch(Actions.fetchAnticheatStatistics(params, append)),
  changeUserId: userID => dispatch(filterActions.changeUserId(userID)),
  changeChallengeId: challengeId =>
    dispatch(filterActions.changeChallengeId(challengeId)),
});

const initialState = ({ userID, challengeId, match }) => ({
  userID: userID || match.params.userID || null,
  challengeId,
});

class AnticheatStatistics extends Component {
  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    if (nextProps.challengeId !== prevState.challengeId) {
      newState.challengeId = nextProps.challengeId;
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

  componentDidMount() {
    if (this.state.userID && !this.props.userID)
      this.changeUserId(this.state.userID);
    this.onSearch();
  }

  onShowMore = () => {
    this.onSearch({ nextPageToken: this.props.nextPageToken });
  };

  onSearch = (props = {}) => {
    const { nextPageToken } = props;
    const { userID, challengeId } = this.state;
    if (userID === null || challengeId === null) return;
    const append = !!nextPageToken;
    const params = {
      nextPageToken,
      userId: userIdSelector(userID),
      challengeId,
    };
    this.props.onSearch(params, append);
  };

  changeUserId = userID => {
    this.changeHistory(userID);
    this.props.changeUserId(userID);
  };

  changeHistory(value) {
    const userID = userIdSelector(value);
    const { history, match } = this.props;
    const matchUrl =
      match.url.indexOf('by-date') >= 0
        ? match.url
        : joinPath(match.url, 'by-date');
    const url =
      match.params.userID === undefined
        ? joinPath(matchUrl, userID)
        : match.path.replace(':userID', userID);
    history.replace(url);
  }

  render() {
    return AnticheatStatisticsStatelessComponent({
      ...this.props,
      ...this.state,
      onShowMore: this.onShowMore,
      onSearch: this.onSearch,
      changeUserId: this.changeUserId,
      apiCallFunc,
      renderOptionFunc,
    });
  }
}

AnticheatStatistics.propTypes = {
  challengeId: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  nextPageToken: PropTypes.string,
  changeUserId: PropTypes.func.isRequired,
  userID: PropTypes.string,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

AnticheatStatistics.defaultProps = {
  challengeId: null,
  nextPageToken: null,
  userID: null,
};

export default connect(stateToProps, dispatchToProps, AnticheatStatistics);
