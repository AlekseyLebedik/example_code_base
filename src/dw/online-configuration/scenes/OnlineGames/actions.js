import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import * as AT from './actionTypes';

export const fetchOnlineGames = (context, params, append = false) => ({
  type: AT.ONLINE_GAMES_FETCH,
  context,
  params,
  append,
});

export const fetchOnlineGamesSuccess = (payload, append, context) => {
  const {
    nextPageToken,
    elementsOrder,
    contexts = [],
    q,
    searchAvailable = true,
  } = payload;
  return {
    type: AT.ONLINE_GAMES_FETCH_SUCCESS,
    // TODO: For now OnlineGames API returns data with `games` attribute
    // when other endpoints use `data`.
    // Thus this does not work in case WS call is not supported by MMP and
    // API error handles returns { data: [] }
    // Remove this check once API migrated to return `data` attribute
    onlineGames: payload.data || payload.games,
    nextPageToken,
    elementsOrder,
    contexts,
    q,
    append,
    context,
    searchAvailable,
  };
};

export const fetchOnlineGamesFailed =
  (err, context, params, append) => dispatch => {
    dispatch(GlobalProgressActions.done());
    dispatch(
      CriticalErrorActions.show(err, () =>
        fetchOnlineGames(context, params, append)
      )
    );
  };

export const onlineGamesListItemClick = onlineGame => ({
  type: AT.ONLINE_GAMES_LIST_ITEM_ONCLICK,
  onlineGame,
});
