import { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { connect } from 'dw/core/helpers/component';
import { joinQueryParam } from 'dw/core/helpers/path';

import {
  fetchLeaderboards,
  leaderboardsListItemClick,
  resetLeaderboards,
} from './actions';
import StatelessComponent from './presentational';

class Leaderboards extends Component {
  componentDidMount() {
    const { q } = queryString.parse(this.props.history.location.search);
    this.props.onLoad({
      q,
      selectedLeaderboard: Number(this.props.match.params.id),
    });
  }

  render() {
    const newProps = {
      reduxProps: this.props,
    };
    return <StatelessComponent {...newProps} />;
  }
}

const stateToProps = (state, props) => ({
  history: props.history,
  match: props.match,
  leaderboards: state.Scenes.Leaderboards.leaderboards,
  leaderboardsLoading: state.Scenes.Leaderboards.leaderboardsLoading,
  nextPageToken: state.Scenes.Leaderboards.nextPageToken,
  searchAvailable: state.Scenes.Leaderboards.searchAvailable,
  selectedLeaderboard: state.Scenes.Leaderboards.selectedLeaderboard,
  q: state.Scenes.Leaderboards.q,
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onSearch: payload => {
    const { history, match } = stateProps;
    const path = !payload.q
      ? match.url
      : joinQueryParam(match.url, 'q', payload.q);
    history.replace(path);
    dispatchProps.onSearch(payload.q);
  },
});

const dispatchToProps = dispatch => ({
  onLoad: query => dispatch(fetchLeaderboards(query)),
  onSearch: q => dispatch(fetchLeaderboards({ q })),
  onShowMore: (nextPageToken, q) =>
    dispatch(fetchLeaderboards({ nextPageToken, q }, true)),
  onClickListItem: leaderboard =>
    dispatch(leaderboardsListItemClick(leaderboard)),
  resetLeaderboards: items =>
    dispatch(
      resetLeaderboards(
        items.map(item => item.id),
        items.map(item => item.name)
      )
    ),
});

Leaderboards.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  onLoad: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, Leaderboards, mergeProps);
