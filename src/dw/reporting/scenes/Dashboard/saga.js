import { all, spawn, call, put, takeLatest } from 'redux-saga/effects';

import { getStatData as apiGetStatData } from 'dw/devzone/services/graph';
import { STAT_NAMES } from 'dw/reporting/constants';
import * as Actions from './actions';
import { FETCH_FRANCHISE_DATA } from './actionTypes';

export function* fetchStats(APICall, statName, params) {
  const { id, start, end } = params;
  const source = {
    resource: `franchises/${id}/stats`,
  };
  try {
    const { data } = yield call(APICall, statName, source, start, end);
    const result = {
      id,
      statName,
      data: data.series.find(s => s.id === 'total') || { data: [] },
      start,
      end,
    };
    yield put(Actions.fetchFranchiseDataSuccess(result, params.append));
  } catch (e) {
    yield put(Actions.fetchFranchiseDataFailed(e));
  }
}

export function* fetchFranchiseData(action) {
  try {
    yield all(
      STAT_NAMES.map(statName =>
        spawn(fetchStats, apiGetStatData, statName, action)
      )
    );
  } catch (e) {
    yield put(Actions.fetchFranchiseDataFailed(e));
  }
}

function* saga() {
  yield takeLatest(FETCH_FRANCHISE_DATA, fetchFranchiseData);
}

export default saga;
