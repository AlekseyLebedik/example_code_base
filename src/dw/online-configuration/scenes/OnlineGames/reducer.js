import * as AT from './actionTypes';

const INITIAL_STATE = {
  onlineGames: [],
  nextPageToken: undefined,
  selectedOnlineGame: undefined,
  elementsOrder: [],
  contexts: [],
  selectedContext: 'MP',
  q: undefined,
  searchAvailable: true,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ONLINE_GAMES_FETCH_SUCCESS: {
      let { selectedOnlineGame } = state;
      const {
        append,
        context,
        contexts,
        elementsOrder,
        onlineGames,
        nextPageToken,
        searchAvailable,
        q,
      } = action;
      const firstAvailableContext = contexts.length > 0 ? contexts[0] : '';

      if (q && onlineGames.length !== 1) {
        selectedOnlineGame = undefined;
      }
      return {
        ...state,
        onlineGames: append
          ? [...state.onlineGames, ...onlineGames]
          : onlineGames,
        nextPageToken,
        elementsOrder,
        contexts,
        selectedOnlineGame,
        selectedContext: contexts.includes(context)
          ? context
          : firstAvailableContext,
        q,
        searchAvailable:
          searchAvailable !== undefined
            ? searchAvailable
            : state.searchAvailable,
      };
    }
    case AT.ONLINE_GAMES_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedOnlineGame: action.onlineGame,
      };
    default:
      return state;
  }
};
