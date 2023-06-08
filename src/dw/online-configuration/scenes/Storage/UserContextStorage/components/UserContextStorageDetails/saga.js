import { call, put, takeLatest } from 'redux-saga/effects';

import {
  deleteUserContextStorageFile as apiDeleteUserContextStorageFile,
  downloadUserContextStorageFile as apiDownloadContextStorageStorageFile,
} from 'dw/online-configuration/services/storages';

import * as Actions from './actions';
import * as AT from './actionTypes';

function* deleteUserContextStorageFile(action) {
  try {
    yield call(apiDeleteUserContextStorageFile, action.params);
    yield put(Actions.deleteUserContextStorageFileSuccess(action.params));
  } catch (e) {
    yield put(Actions.deleteUserContextStorageFileFailed(e));
  }
}

function* downloadUserContextStorageFile(action) {
  try {
    const { data } = yield call(
      apiDownloadContextStorageStorageFile,
      action.params
    );
    yield put(Actions.downloadUserContextStorageFileSuccess(data));
  } catch (e) {
    yield put(Actions.downloadUserContextStorageFileFailed(e));
  }
}

function* saga() {
  yield takeLatest(
    AT.USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE,
    deleteUserContextStorageFile
  );
  yield takeLatest(
    AT.USER_CONTEXT_STORAGE_DETAILS_FILE_DOWNLOAD,
    downloadUserContextStorageFile
  );
}

export default saga;
