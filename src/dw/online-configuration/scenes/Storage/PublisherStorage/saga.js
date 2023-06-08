import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getPublisherStorage as apiFetchPublisherStorage,
  uploadPublisherStorageFile as apiUploadPublisherStorageFile,
  deletePublisherStorageFile as apiDeletePublisherStorageFiles,
  bulkDownloadPublisherStorageFiles as apiBulkDownloadPublisherStorageFiles,
} from 'dw/online-configuration/services/storages';
import * as Actions from './actions';
import {
  PUBLISHER_STORAGE_FETCH,
  PUBLISHER_STORAGE_FILES_UPLOAD,
  PUBLISHER_STORAGE_FILES_BULK_DELETE,
  PUBLISHER_STORAGE_FILES_BULK_DOWNLOAD,
} from './actionTypes';

function* fetchPublisherStorage(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(apiFetchPublisherStorage, params);
    const extraPayload = { append, q: params.q };
    yield put(Actions.fetchPublisherStorageSuccess(data, extraPayload));
  } catch (e) {
    yield put(Actions.fetchPublisherStorageFailed(e, params, append));
  }
}

function* uploadPublisherStorageFile(action) {
  try {
    const { data } = yield call(apiUploadPublisherStorageFile, action.values);
    yield put(Actions.uploadPublisherStorageFileSuccess(data));
  } catch (e) {
    yield put(Actions.uploadPublisherStorageFileFailed(e));
  }
}

function* bulkDeletePublisherStorageFiles(action) {
  try {
    const fileIds = action.items.map(item => item.fileID);
    yield call(apiDeletePublisherStorageFiles, fileIds.join(','));
    yield put(Actions.bulkDeletePublisherStorageFilesSuccess(fileIds));
  } catch (e) {
    yield put(Actions.bulkDeletePublisherStorageFiles(e));
  }
}

function* bulkDownloadPublisherStorageFiles(action) {
  try {
    const fileIds = action.items.map(item => item.fileID);
    const { data } = yield call(
      apiBulkDownloadPublisherStorageFiles,
      fileIds.join(',')
    );
    yield put(Actions.bulkDownloadPublisherStorageFilesSuccess(data));
  } catch (e) {
    yield put(Actions.bulkDownloadPublisherStoragesFilesFailed(e));
  }
}

function* saga() {
  yield takeLatest(PUBLISHER_STORAGE_FETCH, fetchPublisherStorage);
  yield takeLatest(PUBLISHER_STORAGE_FILES_UPLOAD, uploadPublisherStorageFile);
  yield takeLatest(
    PUBLISHER_STORAGE_FILES_BULK_DELETE,
    bulkDeletePublisherStorageFiles
  );
  yield takeLatest(
    PUBLISHER_STORAGE_FILES_BULK_DOWNLOAD,
    bulkDownloadPublisherStorageFiles
  );
}

export default saga;
