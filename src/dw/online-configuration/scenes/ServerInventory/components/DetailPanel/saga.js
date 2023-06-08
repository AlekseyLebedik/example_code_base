import { call, put, takeLatest } from 'redux-saga/effects';

import { getServers } from 'dw/online-configuration/services/matchmaking';
import * as actions from './actions';
import { MM_SERVER_LIST_FETCH } from './actionTypes';

function* fetchServerList({ context, buildname, datacenter, state }) {
  try {
    const { data } = yield call(getServers, {
      dataCenters: [datacenter],
      buildNames: [buildname],
      context,
      serverStates: [state],
    });
    yield put(actions.fetchMMServerListSuccess(data.data));
  } catch (e) {
    yield put(actions.fetchMMServerListFailed(e));
  }
}

function* saga() {
  yield takeLatest(MM_SERVER_LIST_FETCH, fetchServerList);
}

export default saga;
