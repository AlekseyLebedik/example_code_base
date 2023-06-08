import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SubmissionError,
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
} from 'redux-form';
import { getFormFileFormatError } from 'dw/core/helpers/form-error';

import * as Api from 'dw/online-configuration/services/marketplace';
import * as Actions from './actions';
import {
  STORES_FETCH,
  STORE_UPLOAD,
  STORE_DETAIL_FETCH,
  STORE_PROPAGATE,
  STORE_SET_ACTIVE,
  STORE_CLEAR_CACHE,
} from './actionTypes';
import { FORM_NAME as PropagateStoreFormName } from './components/StoreDetails/components/PropagateStoreForm/constants';

function* fetchStores(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(Api.getStores, params);
    yield put(Actions.fetchStoresSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchStoresFailed(e, params, append));
  }
}

function* uploadStore(action) {
  const { values, params, reject } = action;
  try {
    yield call(Api.uploadStore, values, params);
    yield put(Actions.uploadStoreSuccess(values.label));
  } catch (e) {
    const validationErrors = getFormFileFormatError(e, 'store');
    if (validationErrors === undefined) {
      yield put(Actions.uploadStoreFailed(e));
    } else {
      reject(new SubmissionError(validationErrors));
      if (!validationErrors.error) {
        yield put(Actions.uploadStoreFailed());
      } else {
        yield put(Actions.uploadStoreFailed(e));
      }
    }
  }
}

function* fetchStoreDetail({ label, context }) {
  try {
    const { data } = yield call(Api.getStoreDetail, label, { context });
    yield put(Actions.fetchStoreDetailSuccess(data));
  } catch (e) {
    try {
      const { data } = yield call(Api.getStores, { q: label, context });
      yield put(Actions.fetchStoreDetailSuccess(data));
    } catch {
      yield put(Actions.fetchStoreDetailFailed(e));
    }
  }
}

function* propagateStore(action) {
  const { store, values, params } = action;
  yield put(startSubmit(PropagateStoreFormName));
  try {
    yield call(Api.propagateStore, store, values, params);
    yield put(Actions.propagateStoreSuccess());
    yield put(setSubmitSucceeded(PropagateStoreFormName));
  } catch (e) {
    const validationErrors = getFormFileFormatError(e, 'store');
    if (validationErrors?.store) {
      const {
        response: {
          data: {
            error: { msg },
          },
        },
      } = e;
      yield put(
        Actions.propagateStoreFailed({
          ...e,
          response: {
            data: { error: { msg: `${msg}. ${validationErrors.store}` } },
          },
        })
      );
    } else if (validationErrors) {
      yield put(stopSubmit(PropagateStoreFormName, validationErrors));
      yield put(Actions.closePropagateStoreLoading());
    } else {
      yield put(Actions.propagateStoreFailed(e));
    }
  }
}

function* setActiveStore(action) {
  try {
    const { label, context } = action;
    yield call(Api.setActiveStore, label, context);
    yield put(Actions.setActiveStoreSuccess(label));
  } catch (e) {
    yield put(Actions.setActiveStoreFailed(e));
  }
}

function* clearStoreCache(action) {
  try {
    const { label } = action;
    yield call(Api.clearStoreDetailCache, label);
    yield put(Actions.clearStoreCacheSuccess(label));
  } catch (e) {
    yield put(Actions.clearStoreCacheFailed(e));
  }
}

function* saga() {
  yield takeLatest(STORES_FETCH, fetchStores);
  yield takeLatest(STORE_CLEAR_CACHE, clearStoreCache);
  yield takeLatest(STORE_DETAIL_FETCH, fetchStoreDetail);
  yield takeLatest(STORE_UPLOAD, uploadStore);
  yield takeLatest(STORE_PROPAGATE, propagateStore);
  yield takeLatest(STORE_SET_ACTIVE, setActiveStore);
}

export default saga;
