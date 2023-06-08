import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getStorageContexts as apiGetStorageContexts,
  getUserContextStorage as apiFetchUserContextStorage,
  uploadUserContextStorageFile as apiUploadUserContextStorageFile,
} from 'dw/online-configuration/services/storages';
import * as Actions from './actions';
import {
  USER_CONTEXT_STORAGE_FETCH,
  USER_CONTEXT_STORAGE_FILES_UPLOAD,
  USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS,
} from './actionTypes';

function* fetchUserContextStorage(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchUserContextStorage, params);
    yield put(
      Actions.fetchUserContextStorageSuccess(data, append, params.fileId)
    );
  } catch (e) {
    yield put(Actions.fetchUserContextStorageFailed(e, params, append));
  }
}

function* uploadUserContextStorageFile(action) {
  try {
    const { data } = yield call(apiUploadUserContextStorageFile, action.values);
    yield put(Actions.uploadUserContextStorageFileSuccess(data));
  } catch (e) {
    yield put(Actions.uploadUserContextStorageFileFailed(e));
  }
}

function* getStorageContexts() {
  try {
    const { data } = yield call(apiGetStorageContexts);
    yield put(Actions.getStorageContextsSuccess(data));
  } catch (e) {
    yield put(Actions.getStorageContextsFailed(e));
  }
}

function* saga() {
  yield takeLatest(USER_CONTEXT_STORAGE_FETCH, fetchUserContextStorage);
  yield takeLatest(
    USER_CONTEXT_STORAGE_FILES_UPLOAD,
    uploadUserContextStorageFile
  );
  yield takeLatest(
    USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS,
    getStorageContexts
  );
}

export default saga;
