import { call, put, takeEvery } from 'redux-saga/effects';

import { getStatData as apiGetStatData } from 'dw/devzone/services/graph';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchStatsData(action) {
  const { start, end } = action.props;
  try {
    const { data } = yield call(
      apiGetStatData,
      action.statName,
      action.source,
      start,
      end
    );
    yield put(
      Actions.fetchStatsDataSuccess(data, action.statName, action.props)
    );
  } catch (e) {
    yield put(Actions.fetchStatsDataFailed(action.statName));
  }
}

function* saga() {
  yield takeEvery(AT.STAT_DATA_FETCH, fetchStatsData);
}

export default saga;
