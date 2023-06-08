import { createSelector } from 'reselect';
import { PLAYER_STATUS } from './constants';

const getPlayerTeam = (teams, playerId) => {
  const team = teams.find(t => t.players.includes(parseInt(playerId, 10)));
  return !team ? 'n/a' : team.id;
};

const remapData = (currentPlayerState, recordTeams, accounts) => {
  const teams = recordTeams.map((t, index) => ({ id: index + 1, players: t }));
  const players = Object.keys(currentPlayerState).map(playerId => ({
    playerId,
    playerName: accounts[playerId],
    state: PLAYER_STATUS[currentPlayerState[playerId]],
    team: getPlayerTeam(teams, playerId),
  }));

  return players;
};

export const accountsSelector = state =>
  state.Components.SessionViewer.accounts;

export const makeDetailsSelector = createSelector(
  accountsSelector,
  accounts => lobby => {
    const { currentPlayerState, teams } = lobby;
    return remapData(currentPlayerState, teams, accounts);
  }
);

export const playerNameSelector = createSelector(
  accountsSelector,
  (_, props) => props.playerId,
  (accounts, playerId) => accounts[playerId]
);
