import { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { connect } from 'dw/core/helpers/component';
import { timezoneOrDefaultSelector as timezoneSelector } from 'dw/core/helpers/date-time';

import { fetchChallengeLogs, challengeLogsListItemClick } from './actions';
import StatelessComponent from './presentational';
import { challengeLogsSelector } from './selectors';

const initialState = props => ({
  q: queryString.parse(props.location.search).q,
});

class ChallengeLogs extends Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    onShowMore: PropTypes.func.isRequired,
    nextPageToken: PropTypes.string,
  };

  static defaultProps = {
    nextPageToken: null,
  };

  state = initialState(this.props);

  componentDidMount() {
    this.props.onLoad(this.state.q);
  }

  onSearch = payload => {
    this.setState({ q: payload });
    this.props.onSearch(this.getSearchParams(payload));
  };

  onShowMore = () => {
    const searchParams = this.getSearchParams(this.state.q);
    this.props.onShowMore(this.props.nextPageToken, searchParams);
  };

  getSearchParams = (payload = {}) => {
    const params = payload.values || {};
    if (payload.default && payload.q) params.logId = payload.q;
    return params;
  };

  render() {
    return StatelessComponent({
      ...this.props,
      q: this.state.q,
      onSearch: this.onSearch,
      onShowMore: this.onShowMore,
    });
  }
}

const stateToProps = state => ({
  challengeLogs: challengeLogsSelector(state),
  nextPageToken: state.Scenes.Security.Anticheat.ChallengeLogs.nextPageToken,
  selectedChallengeLog:
    state.Scenes.Security.Anticheat.ChallengeLogs.selectedLog,
  timezone: timezoneSelector(state),
});

const dispatchToProps = dispatch => ({
  onLoad: query => {
    dispatch(fetchChallengeLogs(!query ? {} : { q: query }));
  },
  onSearch: payload => dispatch(fetchChallengeLogs(payload)),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchChallengeLogs({ nextPageToken, ...q }, true)),
  onClickListItem: challengeLog =>
    dispatch(challengeLogsListItemClick(challengeLog)),
});

export default connect(stateToProps, dispatchToProps, ChallengeLogs);
