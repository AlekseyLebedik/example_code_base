import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const onlineGamesSelector = state => state.Scenes.OnlineGames.onlineGames;

const onlineGamesFormattedSelector = createSelector(
  onlineGamesSelector,
  formatDateTimeSelector,
  (onlineGames, formatDateTime) =>
    onlineGames.map(onlineGame => ({
      ...onlineGame,
      updateTime: formatDateTime(onlineGame.updateTime),
    }))
);

export default onlineGamesFormattedSelector;
