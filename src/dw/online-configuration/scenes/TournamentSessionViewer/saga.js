import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getTournaments as APIGetTournaments,
  getLobbies as APIGetLobbies,
} from 'dw/online-configuration/services/tournamentSessionViewer';

import {
  TOURNAMENT_SESSION_VIEWER_TOURNAMENTS_FETCH,
  TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH,
} from './actionTypes';
import * as Actions from './actions';

function* fetchTournaments({ params, append }) {
  try {
    const { data } = yield call(APIGetTournaments, params);
    yield put(Actions.fetchTournamentsSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchTournamentsFailed(e));
  }
}

function* fetchLobbies({ params }) {
  try {
    const { data } = yield call(APIGetLobbies, params);
    const lobbies = data.data;

    yield put(Actions.fetchLobbiesSuccess(lobbies));
  } catch (e) {
    yield put(Actions.fetchLobbiesFailed(e));
  }
}

function* saga() {
  yield takeLatest(
    TOURNAMENT_SESSION_VIEWER_TOURNAMENTS_FETCH,
    fetchTournaments
  );
  yield takeLatest(TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH, fetchLobbies);
}

export default saga;
