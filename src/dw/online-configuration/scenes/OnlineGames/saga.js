import { call, put, takeLatest } from 'redux-saga/effects';

import { getOnlineGames as apiFetchOnlineGames } from 'dw/online-configuration/services/onlineGames';
import * as Actions from './actions';
import { ONLINE_GAMES_FETCH } from './actionTypes';

function* fetchOnlineGames(action) {
  const { context, params, append } = action;
  try {
    const { data } = yield call(apiFetchOnlineGames, context, params);
    yield put(Actions.fetchOnlineGamesSuccess(data, append, context));
  } catch (e) {
    yield put(Actions.fetchOnlineGamesFailed(e, context, params, append));
  }
}

function* saga() {
  yield takeLatest(ONLINE_GAMES_FETCH, fetchOnlineGames);
}

export default saga;
