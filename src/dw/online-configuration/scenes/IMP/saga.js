import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getIMPs as apiGetIMPs,
  uploadToIMPHistory as apiUploadToIMPHistory,
} from 'dw/online-configuration/services/imp';
import * as Actions from './actions';
import { IMPS_FETCH, IMP_UPLOAD } from './actionTypes';

function* fetchIMPs(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiGetIMPs, params);
    yield put(Actions.fetchIMPsSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchIMPsFailed(e, params, append));
  }
}

function* uploadToIMPHistory(action) {
  try {
    yield call(apiUploadToIMPHistory, action.values);
    yield put(Actions.uploadToIMPHistorySuccess());
  } catch (e) {
    yield put(Actions.uploadToIMPHistoryFailed(e));
  }
}

function* saga() {
  yield takeLatest(IMPS_FETCH, fetchIMPs);
  yield takeLatest(IMP_UPLOAD, uploadToIMPHistory);
}

export default saga;
