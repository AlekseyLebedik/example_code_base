import { all, call, put, takeLatest } from 'redux-saga/effects';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { event as api } from 'playpants/services';
import {
  handleLoadSaga,
  handleSaveSaga,
} from 'playpants/components/FeedbackWrapper/sagas';
import { getNowTimestamp } from 'playpants/helpers/dateTime';
import { prettyPrint } from 'playpants/helpers/json';

import * as actions from './actions';
import * as AT from './actionTypes';

const handleLoadingFileStorageSagas = handleLoadSaga([
  `${AT.FILESTORAGE_CONTEXTS_FETCH}_FETCH`,
  AT.DOWNLOAD_FILE,
  AT.FILE_DETAILS_FETCH,
  AT.REMOVE_FILE,
  AT.UPDATE_FILE,
  AT.UPLOAD_FILE,
  AT.UPLOAD_PROGRESS_FETCH,
]);

const handleSavingFileStorageSagas = handleSaveSaga([
  AT.REMOVE_FILE,
  AT.UPDATE_FILE,
  AT.UPLOAD_FILE,
]);

/**
 * Core factory saga generator for fetching event contexts
 */
const fetchFileStorageContextsSaga = getSaga(
  AT.FILESTORAGE_CONTEXTS_FETCH,
  params => api.fetchFileStorageContexts(params)
);

// TO BE ADDED IN NEXT PR
// const fetchUploadProgressSaga = getSaga(
//   AT.UPLOAD_PROGRESS_FETCH,
//   api.uploadProgressFetch,
//   null
// );

// THIS WILL BE ADDED IN NEXT PR
// const fetchFileDetailsSaga = getSaga(
//   AT.FILE_DETAILS_FETCH,
//   params => api.fetchFileDetails(params),
//   null,
//   undefined,
//   params => params.selectedActivity.activity.files
// );

// REMOVED IN NEXT PR
function* fileDetailsFetch({ selectedActivity }) {
  try {
    // format component files for pubstorage from foreign keys
    const { files } = selectedActivity.activity;
    const data = yield all(files.map(id => call(api.fetchFileDetails, id)));
    const fileDetails = data.map(i => {
      const { file_name: remoteFilename, id, properties } = i.data;
      const { localFilename, title, context, comment, size } =
        JSON.parse(properties);
      return {
        filename: localFilename,
        remoteFilename,
        title,
        context,
        comment,
        size,
        id,
      };
    });

    const filesPayload = {};
    fileDetails.forEach(file => {
      filesPayload[file.id] = file;
    });

    yield put(actions.fileDetailsFetchSuccess(filesPayload));
  } catch (e) {
    yield put(actions.fileDetailsFetchFailed(e));
  }
}

// TO BE REMOVED IN NEXT PR
function* uploadProgressFetch({ id, callback }) {
  try {
    const { data } = yield call(api.uploadProgressFetch, id);
    yield put(actions.uploadProgressFetchSuccess(data, id));
    callback('success');
  } catch (e) {
    yield put(actions.uploadProgressFetchFailed(e));
    callback('failure');
  }
}

function* uploadFileAction({ selectedActivity, fileDetails, file, callback }) {
  try {
    const { type, id: activityId, activity } = selectedActivity;
    const { files } = activity;
    const properties = {
      title: fileDetails.title,
      context: fileDetails.context,
      comment: fileDetails.comment,
      size: fileDetails.size,
      localFilename: fileDetails.filename,
    };
    const formData = new FormData();
    const fileInfo = {
      file,
      file_name: fileDetails.remoteFilename,
      type,
      owner_id: activityId,
      properties: prettyPrint(properties),
      uploaded_at: getNowTimestamp(),
    };
    Object.entries(fileInfo).forEach(([key, val]) => formData.append(key, val));
    const { data } = yield call(
      api.uploadFile,
      formData,
      fileDetails['X-Progress-ID']
    );

    const payload = {
      ...selectedActivity,
      activity: { files: [...files, data.id] },
    };

    const filesPayload = {
      [data.id]: fileDetails,
    };
    yield put(actions.uploadFileSuccess(payload, filesPayload));
    callback('success');
  } catch (e) {
    yield put(actions.uploadFileFailed(e));
    callback('failure');
  }
}

function* downloadFile({ id, name, callback }) {
  try {
    yield call(api.downloadFile, id, name);
    yield put(actions.downloadFileSuccess());
    callback();
  } catch (e) {
    yield put(actions.downloadFileFailed(e));
  }
}

function* removeFile({ id, callback }) {
  try {
    yield call(api.removeFile, id);
    yield put(actions.removeFileSuccess(id));
    callback();
  } catch (e) {
    yield put(actions.removeFileFailed(e));
  }
}

function* updateFile({ file, id }) {
  try {
    const { title, context, comment, size, filename, remoteFilename } = file;
    const properties = {
      title,
      context,
      comment,
      size,
      localFilename: filename,
    };
    const fileInfo = {
      file_name: remoteFilename,
      properties: prettyPrint(properties),
    };
    yield call(api.updateFile, id, fileInfo);
    yield put(actions.updateFileSuccess());
  } catch (e) {
    yield put(actions.updateFileFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.UPLOAD_FILE, uploadFileAction);
  yield takeLatest(AT.DOWNLOAD_FILE, downloadFile);
  yield takeLatest(AT.REMOVE_FILE, removeFile);
  yield takeLatest(AT.UPDATE_FILE, updateFile);
  // TO BE REMOVED IN NEXT PR
  yield takeLatest(AT.FILE_DETAILS_FETCH, fileDetailsFetch);
  yield takeLatest(AT.UPLOAD_PROGRESS_FETCH, uploadProgressFetch);
}

// NEXT PR ADD: fetchUploadProgressSaga , fetchFileDetailsSaga
export default [
  saga,
  handleLoadingFileStorageSagas,
  handleSavingFileStorageSagas,
  fetchFileStorageContextsSaga,
];
