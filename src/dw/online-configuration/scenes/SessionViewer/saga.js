import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getLobbies as apiGetLobbies,
  getPlaylists as apiGetPlaylists,
} from 'dw/online-configuration/services/sessionViewer';
import * as Actions from './actions';
import {
  SESSION_VIEWER_LOBBIES_FETCH,
  SESSION_VIEWER_PLAYLISTS_FETCH,
} from './actionTypes';

function* fetchLobbies({ params }) {
  try {
    const { data } = yield call(apiGetLobbies, params);
    const finishRecursion = !data.nextPageToken;
    const pageTokens = {};
    if (params.playlist && params.datacenter) {
      pageTokens[`${params.playlist}-${params.datacenter}`] =
        data.nextPageToken;
    }
    yield put(
      Actions.fetchLobbiesSuccess(data.data, finishRecursion, pageTokens)
    );

    if (finishRecursion) return;
    yield* fetchLobbies({
      params: {
        ...params,
        nextPageToken: data.nextPageToken,
      },
    });
  } catch (e) {
    yield put(Actions.fetchLobbiesFailed(e));
  }
}

function* fetchPlaylists({ params }) {
  try {
    const { data } = yield call(apiGetPlaylists, params);
    if (data.data.length === 0) {
      yield* fetchLobbies({ params: {} });
    } else {
      yield put(Actions.fetchPlaylistsSuccess(data.data));
    }
  } catch (e) {
    yield put(Actions.fetchPlaylistsFailed(e));
  }
}

function* saga() {
  yield takeLatest(SESSION_VIEWER_LOBBIES_FETCH, fetchLobbies);
  yield takeLatest(SESSION_VIEWER_PLAYLISTS_FETCH, fetchPlaylists);
}

export default saga;
