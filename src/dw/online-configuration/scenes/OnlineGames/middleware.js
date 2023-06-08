import { ONLINE_GAMES_FETCH_SUCCESS } from './actionTypes';
import { onlineGamesListItemClick } from './actions';

export const middleware = store => next => action => {
  switch (action.type) {
    case ONLINE_GAMES_FETCH_SUCCESS:
      if (action.onlineGames.length === 1) {
        store.dispatch(onlineGamesListItemClick(action.onlineGames[0]));
      }
      break;
    default:
      break;
  }
  next(action);
};
