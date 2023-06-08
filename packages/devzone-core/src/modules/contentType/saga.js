import { call, put, takeLatest } from 'redux-saga/effects';
import { getContentTypes } from '../../services/contentType';

import * as GenericActions from '../../helpers/actions';
import { CONTENT_TYPES_PREFIX } from './actions';

function* fetchContentTypes() {
  try {
    const { data } = yield call(getContentTypes);
    yield put(GenericActions.fetchSuccess(CONTENT_TYPES_PREFIX, data));
  } catch (e) {
    yield put(GenericActions.fetchFailed(CONTENT_TYPES_PREFIX, e));
  }
}

function* contentTypesSaga() {
  yield takeLatest(`${CONTENT_TYPES_PREFIX}_FETCH`, fetchContentTypes);
}

export default contentTypesSaga;
