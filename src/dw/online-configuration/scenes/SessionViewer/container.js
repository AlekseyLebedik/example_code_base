import React, { Component } from 'react';
import PropTypes from 'prop-types';

import omit from 'lodash/omit';
import { bindActionCreators } from 'redux';
import { connect } from 'dw/core/helpers/component';

import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { fetchLobbies, fetchPlaylists } from './actions';
import SessionViewerStatelessComponent from './presentational';
import {
  getPlaylistCount,
  playlistTotalsSelector,
  formattedLobbiesSelector,
} from './selectors';

const stateToProps = (state, props) => {
  const { loading, backgroundLoading, playlists, pageTokens } =
    state.Scenes.SessionViewer;

  const lobbies = formattedLobbiesSelector(state, props);

  return {
    loading,
    backgroundLoading,
    pageTokens,
    lobbies,
    playlists,
    playlistCount:
      playlists.length > 0
        ? playlistTotalsSelector(playlists)
        : getPlaylistCount(lobbies),
    formatDateTime: formatDateTimeSelector(state),
  };
};

const dispatchToProps = dispatch => ({
  onLoad: () => {
    dispatch(fetchPlaylists());
  },
  onPlaylistDatacenterChanged: bindActionCreators(fetchLobbies, dispatch),
});

class SessionViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistSelected: undefined,
      search: undefined,
    };
  }

  componentDidMount() {
    this.props.onLoad();
  }

  static getDerivedStateFromProps({ lobbies }, { playlistSelected }) {
    return !playlistSelected && lobbies.length > 0
      ? { playlistSelected: lobbies[0].playlistId }
      : null;
  }

  onSelectPlaylist = playlist =>
    this.setState({
      playlistSelected: playlist,
      selectedDatacenter: null,
    });

  onSelectDatacenter = (playlist, datacenter) => {
    const pageToken = this.props.pageTokens[`${playlist}-${datacenter}`];
    this.props.onPlaylistDatacenterChanged(playlist, datacenter, pageToken);
    this.setState({ selectedDatacenter: datacenter });
  };

  onSearch = item => this.setState({ search: item });

  onClearSearch = () => this.setState({ search: undefined });

  render() {
    let { lobbies } = this.props;
    const { playlists, playlistCount } = this.props;
    const { search, playlistSelected, selectedDatacenter } = this.state;

    if (lobbies.length > 0 && search !== undefined) {
      lobbies = lobbies.filter(l =>
        Object.keys(l.currentPlayerState).includes(search)
      );
    }

    const newProps = {
      ...this.props,
      lobbies,
      playlists,
      playlistCount,
      playlistSelected,
      selectedDatacenter,
      search,
      onSelectDatacenter: this.onSelectDatacenter,
      onSelectPlaylist: this.onSelectPlaylist,
      onSearch: this.onSearch,
      onClearSearch: this.onClearSearch,
    };

    return <SessionViewerStatelessComponent {...newProps} />;
  }
}

SessionViewer.propTypes = {
  ...omit(SessionViewerStatelessComponent.propTypes, [
    'onSelectDatacenter',
    'onSelectPlaylist',
    'onSearch',
    'onClearSearch',
  ]),
  onLoad: PropTypes.func.isRequired,
};

export default connect(stateToProps, dispatchToProps, SessionViewer);
