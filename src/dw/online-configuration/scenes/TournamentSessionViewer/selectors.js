import { createSelector } from 'reselect';
import { generatePath } from 'react-router-dom';

export const tournamentsSelector = state =>
  state.Scenes.TournamentSessionViewer.tournaments;

export const nextPageTokenSelector = state =>
  state.Scenes.TournamentSessionViewer.nextPageToken;

export const searchQuerySelector = state =>
  state.Scenes.TournamentSessionViewer.q;

const lobbiesSelector = state =>
  state.Scenes.TournamentSessionViewer &&
  state.Scenes.TournamentSessionViewer.lobbies;

export const lobbiesLoadingSelector = state =>
  state.Scenes.TournamentSessionViewer.loading;

export const tournamentLoadingSelector = state =>
  state.Scenes.TournamentSessionViewer.loadingList;

export const formattedLobbiesSelector = createSelector(
  lobbiesSelector,
  (_, props) => props,
  (lobbies, props) => {
    const { match, location } = props;
    const { titleId, env } = match.params;

    const url = location.pathname
      .replace(match.url, generatePath(match.path, { titleId, env }))
      .replace('tournament-engine', 'lobby-viewer');

    return (
      lobbies &&
      lobbies.map(lobby => ({
        ...lobby,
        lobbyURL: `${url}/${lobby.id}`,
      }))
    );
  }
);

export const agGridLobbiesSelector = createSelector(
  formattedLobbiesSelector,
  lobbies => lobbies
);
