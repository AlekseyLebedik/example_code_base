import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchUserFiles as apiFetchUserFiles,
  uploadUserFile as apiUploadUserFile,
  deleteUserFile as apiDeleteUserFile,
  downloadUserFile as apiDownloadUserFile,
} from 'dw/online-configuration/services/storages';
import * as Actions from './actions';
import {
  STORAGE_USER_FILES_FETCH,
  STORAGE_USER_FILES_UPLOAD,
  STORAGE_USER_FILES_DELETE,
  STORAGE_USER_FILES_DOWNLOAD,
} from './actionTypes';

function* fetchUserFiles(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchUserFiles, params);
    yield put(Actions.fetchUserFilesSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchUserFilesFailed(e, params, append));
  }
}

function* uploadUserFile(action) {
  try {
    const { data } = yield call(apiUploadUserFile, action.values);
    yield put(Actions.uploadUserFileSuccess(data));
  } catch (e) {
    yield put(Actions.uploadUserFileFailed(e));
  }
}

function* deleteUserFile(action) {
  try {
    yield call(apiDeleteUserFile, action.fileID);
    yield put(Actions.deleteUserFileSuccess(action.fileID));
  } catch (e) {
    yield put(Actions.deleteUserFileFailed(e));
  }
}

function* downloadUserFile(action) {
  try {
    const { data } = yield call(apiDownloadUserFile, action.fileID);
    yield put(Actions.downloadUserFileSuccess(data));
  } catch (e) {
    yield put(Actions.downloadUserFileFailed(e));
  }
}

function* saga() {
  yield takeLatest(STORAGE_USER_FILES_FETCH, fetchUserFiles);
  yield takeLatest(STORAGE_USER_FILES_UPLOAD, uploadUserFile);
  yield takeLatest(STORAGE_USER_FILES_DELETE, deleteUserFile);
  yield takeLatest(STORAGE_USER_FILES_DOWNLOAD, downloadUserFile);
}

export default saga;
