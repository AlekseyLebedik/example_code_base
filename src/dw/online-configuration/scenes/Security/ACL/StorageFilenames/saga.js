import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  getStorageFilenames as apiFetchStorageFilenames,
  addStorageFilename as apiAddStorageFilename,
  deleteStorageFilename as apiDeleteStorageFilename,
} from 'dw/online-configuration/services/security';
import * as Actions from './actions';
import {
  STORAGE_FILENAMES_FETCH,
  STORAGE_FILENAME_ADD,
  STORAGE_FILENAME_DELETE,
} from './actionTypes';

function* fetchStorageFilenames(action) {
  try {
    const { data } = yield call(apiFetchStorageFilenames, action.params);
    yield put(Actions.fetchStorageFilenamesSuccess(data));
  } catch (e) {
    yield put(Actions.fetchStorageFilenamesFailed(e, action));
  }
}

function* addStorageFileName(action) {
  try {
    yield call(apiAddStorageFilename, action.values);
    yield put(Actions.addStorageFilenameSuccess());
  } catch (e) {
    yield put(Actions.addStorageFilenameFailed(e));
  }
}

function* deleteStorageFileName(action) {
  const deleteFilenames = () =>
    action.filenameIds.map(filenameId =>
      call(apiDeleteStorageFilename, filenameId)
    );
  try {
    yield all(deleteFilenames());
    yield put(Actions.deleteStorageFilenameSuccess(action.filenameIds));
  } catch (e) {
    yield put(Actions.deleteStorageFilenameFailed(e));
  }
}

function* saga() {
  yield takeLatest(STORAGE_FILENAMES_FETCH, fetchStorageFilenames);
  yield takeLatest(STORAGE_FILENAME_ADD, addStorageFileName);
  yield takeLatest(STORAGE_FILENAME_DELETE, deleteStorageFileName);
}

export default saga;
