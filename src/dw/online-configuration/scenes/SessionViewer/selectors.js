import { createSelector } from 'reselect';
import { generatePath } from 'react-router-dom';

export const getPlaylistCount = createSelector(
  lobbies => lobbies.filter(l => l.playlistId !== null),
  lobbies => {
    if (!lobbies || lobbies.length === 0) return {};

    const count = (ary, classifier = String) =>
      ary.reduce((counter, item) => {
        const p = classifier(item);
        return {
          ...counter,
          [p]: counter.hasOwnProperty(p) ? counter[p] + 1 : 1,
        };
      }, {});

    return count(lobbies, item => item.playlistId);
  }
);

export const playlistTotalsSelector = createSelector(
  playlists => playlists,
  playlists => {
    const totals = playlists.reduce(
      (counter, item) => ({
        ...counter,
        [item.id]: Object.values(item.playerDistribution).reduce(
          (a, b) => a + b,
          0
        ),
      }),
      {}
    );
    return totals;
  }
);

const lobbiesSelector = state =>
  state.Scenes.SessionViewer.lobbies &&
  state.Scenes.SessionViewer.lobbies.filter(l => l.playlistId !== null);

export const formattedLobbiesSelector = createSelector(
  lobbiesSelector,
  (_, props) => props,
  (lobbies, props) => {
    const { match, location } = props;
    const { titleId, env } = match.params;

    const url = location.pathname
      .replace(match.url, generatePath(match.path, { titleId, env }))
      .replace('session-viewer', 'lobby-viewer');

    return lobbies.map(lobby => ({
      ...lobby,
      lobbyURL: `${url}/${lobby.id}`,
    }));
  }
);
