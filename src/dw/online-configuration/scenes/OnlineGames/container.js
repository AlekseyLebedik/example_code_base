import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { connect } from 'dw/core/helpers/component';

import onlineGamesSelector from './selectors';
import { fetchOnlineGames, onlineGamesListItemClick } from './actions';
import StatelessComponent from './presentational';

class OnlineGames extends Component {
  componentDidMount() {
    const { q } = queryString.parse(this.props.location.search);
    this.props.onLoad(this.props.selectedContext, q);
  }

  search(payload) {
    this.props.onSearch(this.props.selectedContext, payload);
  }

  render() {
    const newProps = {
      reduxProps: this.props,
      reactProps: {
        onSearch: payload => this.search(payload),
        changeContext: event => this.props.changeContext(event.target.value),
      },
    };
    return <StatelessComponent {...newProps} />;
  }
}

const stateToProps = state => ({
  onlineGames: onlineGamesSelector(state),
  nextPageToken: state.Scenes.OnlineGames.nextPageToken,
  contexts: state.Scenes.OnlineGames.contexts,
  selectedContext: state.Scenes.OnlineGames.selectedContext,
  searchAvailable: state.Scenes.OnlineGames.searchAvailable,
  q: state.Scenes.OnlineGames.q,
});

const dispatchToProps = dispatch => ({
  onLoad: (context, query) => {
    dispatch(fetchOnlineGames(context, !query ? {} : { q: query }));
  },
  onSearch: (context, payload) =>
    dispatch(fetchOnlineGames(context, { q: payload.q })),
  onShowMore: (context, nextPageToken, q) =>
    dispatch(fetchOnlineGames(context, { nextPageToken, q }, true)),
  onClickListItem: onlineGame => dispatch(onlineGamesListItemClick(onlineGame)),
  changeContext: context => dispatch(fetchOnlineGames(context)),
});

OnlineGames.propTypes = {
  location: PropTypes.object.isRequired,
  onLoad: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  changeContext: PropTypes.func.isRequired,
  selectedContext: PropTypes.string.isRequired,
};

export default connect(stateToProps, dispatchToProps, OnlineGames);
