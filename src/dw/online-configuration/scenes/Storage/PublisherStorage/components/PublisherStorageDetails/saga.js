import { call, put, takeLatest } from 'redux-saga/effects';

import {
  deletePublisherStorageFile as apiDeletePublisherStorageFile,
  downloadPublisherStorageFile as apiDownloadPublisherStorageFile,
} from 'dw/online-configuration/services/storages';

import * as Actions from './actions';
import * as AT from './actionTypes';

function* deletePublisherStorageFile(action) {
  try {
    yield call(apiDeletePublisherStorageFile, action.fileID);
    yield put(Actions.deletePublisherStorageFileSuccess(action.fileID));
  } catch (e) {
    yield put(Actions.deletePublisherStorageFileFailed(e));
  }
}

function* downloadPublisherStorageFile(action) {
  try {
    const { data } = yield call(apiDownloadPublisherStorageFile, action.fileID);
    yield put(Actions.downloadPublisherStorageFileSuccess(data));
  } catch (e) {
    yield put(Actions.downloadPublisherStorageFileFailed(e));
  }
}

function* saga() {
  yield takeLatest(
    AT.PUBLISHER_STORAGE_DETAILS_DELETE_FILE,
    deletePublisherStorageFile
  );
  yield takeLatest(
    AT.PUBLISHER_STORAGE_DETAILS_FILE_DOWNLOAD,
    downloadPublisherStorageFile
  );
}

export default saga;
