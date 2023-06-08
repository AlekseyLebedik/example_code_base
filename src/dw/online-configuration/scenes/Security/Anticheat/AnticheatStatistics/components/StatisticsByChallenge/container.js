import { Component } from 'react';
import PropTypes from 'prop-types';
import { joinPath } from 'dw/core/helpers/path';
import { connect } from 'dw/core/helpers/component';
import { hasData } from 'dw/core/helpers/object';
import { getAccounts } from 'dw/online-configuration/services/accounts';
import { userIdSelector } from 'dw/online-configuration/scenes/Accounts/selectors';

import * as Actions from './actions';
import * as filterActions from '../../actions';
import { anticheatStatisticsSelector } from './selectors';
import * as filterSelectors from '../../selectors';
import AnticheatStatisticsStatelessComponent from './presentational';

const apiCallFunc = input => getAccounts({ q: input });
const renderOptionFunc = item => `${item.userName} | ${item.userID}`;

const stateToProps = state => ({
  anticheatStatistics: anticheatStatisticsSelector(state),
  nextPageToken:
    state.Scenes.Security.Anticheat.AnticheatStatistics.ByChallenge
      .nextPageToken,
  userID: filterSelectors.userIdSelector(state),
  date: filterSelectors.dateSelector(state),
});

const dispatchToProps = dispatch => ({
  onSearch: (params, append) =>
    dispatch(Actions.fetchAnticheatStatistics(params, append)),
  changeUserId: userID => dispatch(filterActions.changeUserId(userID)),
  changeDate: date => dispatch(filterActions.changeDate(date)),
});

const initialState = ({ userID, date, match }) => ({
  userID: userID || match.params.userID || null,
  date,
});

class AnticheatStatistics extends Component {
  state = initialState(this.props);

  static getDerivedStateFromProps(nextProps, prevState) {
    const newState = {};
    const nextUserId = userIdSelector(nextProps.userID);
    if (nextProps.date !== prevState.date) {
      newState.date = nextProps.date;
    }
    if (nextUserId && nextUserId !== userIdSelector(prevState.userID)) {
      newState.userID = nextProps.userID;
    }
    if (hasData(newState)) {
      return newState;
    }
    return null;
  }

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
    const { userID, date } = this.state;
    if (userID === null) return;
    const append = !!nextPageToken;
    const params = {
      nextPageToken,
      userId: userIdSelector(userID),
      date,
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
      match.url.indexOf('by-challenge') >= 0
        ? match.url
        : joinPath(match.url, 'by-challenge');
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
  date: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
  nextPageToken: PropTypes.string,
  changeUserId: PropTypes.func.isRequired,
  userID: PropTypes.string,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

AnticheatStatistics.defaultProps = {
  nextPageToken: null,
  userID: null,
};

export default connect(stateToProps, dispatchToProps, AnticheatStatistics);
