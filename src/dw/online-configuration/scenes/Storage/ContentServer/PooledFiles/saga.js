import { call, put, takeLatest } from 'redux-saga/effects';

import {
  fetchPooledFiles as apiFetchPooledFiles,
  uploadPooledFile as apiUploadPooledFile,
  deletePooledFile as apiDeletePooledFile,
  downloadPooledFile as apiDownloadPooledFile,
  deleteSummaryFile as apiDeleteSummaryFile,
  downloadSummaryFile as apiDownloadSummaryFile,
} from 'dw/online-configuration/services/storages';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* fetchPooledFiles(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchPooledFiles, params);
    yield put(Actions.fetchPooledFilesSuccess(data, append));
  } catch (e) {
    yield put(Actions.fetchPooledFilesFailed(e, params, append));
  }
}

function* uploadPooledFile(action) {
  try {
    const { data } = yield call(apiUploadPooledFile, action.values);
    yield put(Actions.uploadPooledFileSuccess(data));
  } catch (e) {
    yield put(Actions.uploadPooledFileFailed(e));
  }
}

function* deletePooledFile(action) {
  try {
    yield call(apiDeletePooledFile, action.fileID);
    yield put(Actions.deletePooledFileSuccess(action.fileID));
  } catch (e) {
    yield put(Actions.deletePooledFileFailed(e));
  }
}

function* downloadPooledFile(action) {
  try {
    const { data } = yield call(apiDownloadPooledFile, action.fileID);
    yield put(Actions.downloadPooledFileSuccess(data));
  } catch (e) {
    yield put(Actions.downloadPooledFileFailed(e));
  }
}

function* deleteSummaryFile(action) {
  try {
    yield call(apiDeleteSummaryFile, action.fileID);
    yield put(Actions.deleteSummaryFileSuccess(action.fileID));
  } catch (e) {
    yield put(Actions.deleteSummaryFileFailed(e));
  }
}

function* downloadSummaryFile(action) {
  try {
    const { data } = yield call(apiDownloadSummaryFile, action.fileID);
    yield put(Actions.downloadSummaryFileSuccess(data));
  } catch (e) {
    yield put(Actions.downloadSummaryFileFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.STORAGE_POOLED_FILES_FETCH, fetchPooledFiles);
  yield takeLatest(AT.STORAGE_POOLED_FILES_UPLOAD, uploadPooledFile);
  yield takeLatest(AT.STORAGE_POOLED_FILES_DELETE, deletePooledFile);
  yield takeLatest(AT.STORAGE_POOLED_FILES_DOWNLOAD, downloadPooledFile);
  yield takeLatest(AT.STORAGE_POOLED_FILES_SUMMARY_DELETE, deleteSummaryFile);
  yield takeLatest(
    AT.STORAGE_POOLED_FILES_SUMMARY_DOWNLOAD,
    downloadSummaryFile
  );
}

export default saga;
