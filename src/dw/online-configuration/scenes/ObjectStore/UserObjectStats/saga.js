import { call, put, takeLatest, delay } from 'redux-saga/effects';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as API from 'dw/online-configuration/services/objectStore';
import { FETCH_OBJECT_STATS, UPDATE_STATISTIC_VALUE } from './constants';
import { fetchObjectStatSuccess, updateStatValueSuccess } from './actions';

function* fetchObjectSaga(action) {
  const {
    successCallback,
    failCallback,
    category,
    statistic,
    ranks: { minRank, maxRank },
  } = action.params;
  try {
    const { data } = yield call(API.getObjectStats, {
      category,
      statistic,
      minRank,
      maxRank,
    });
    const nextPageToken = data.max_rank;
    if (successCallback) successCallback(data.objects, nextPageToken);
    yield put(fetchObjectStatSuccess(data));
  } catch (e) {
    if (failCallback) failCallback(e);
  }
}

function* updateStatisticSaga(action) {
  const { category, statistic, owner, name, number } = action.params;
  try {
    yield call(API.updateObjectStats, {
      category,
      statistic,
      owner,
      name,
      number,
    });
    yield delay(250);
    yield put(updateStatValueSuccess());
    yield put(
      GlobalSnackBarActions.show(
        `Statistic value for object ${name} updated successfully.`,
        'success'
      )
    );
  } catch (err) {
    yield put(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  }
}

function* rootSaga() {
  yield takeLatest(FETCH_OBJECT_STATS, fetchObjectSaga);
  yield takeLatest(UPDATE_STATISTIC_VALUE, updateStatisticSaga);
}

export default rootSaga;
