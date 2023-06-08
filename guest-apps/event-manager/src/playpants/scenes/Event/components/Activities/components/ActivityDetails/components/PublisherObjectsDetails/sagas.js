import { call, put, takeLatest } from 'redux-saga/effects';
import { startSubmit, stopSubmit, setSubmitSucceeded } from 'redux-form';

import { getSaga, getUpdateSaga } from '@demonware/devzone-core/helpers/sagas';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { FORM_NAME as ADD_FILE_FORM_NAME } from 'dw/core/components/ObjectStore/constants';

import { event as api } from 'playpants/services';
import {
  handleLoadSaga,
  handleSaveSaga,
} from 'playpants/components/FeedbackWrapper/sagas';
import { formatActivityPayload } from './helpers';
import * as AT from './actionTypes';
import * as actions from './actions';

const handleLoadingObjectStoreSagas = handleLoadSaga([
  `${AT.DELETE_OBJECT}_UPDATE`,
  `${AT.DOWNLOAD_OBJECT}_FETCH`,
  `${AT.FETCH_CATEGORIES}_FETCH`,
  `${AT.FETCH_GROUPS}_FETCH`,
  AT.UPLOAD_OBJECT,
]);
const handleSavingObjectStoreSagas = handleSaveSaga([
  `${AT.DELETE_OBJECT}_UPDATE`,
  AT.UPLOAD_OBJECT,
]);

function* uploadObject({ eventId, selectedActivity, formData }) {
  try {
    yield put(startSubmit(ADD_FILE_FORM_NAME));
    const { data } = yield call(api.uploadPublisherObject, formData);
    const payload = formatActivityPayload(data, selectedActivity);
    yield call(api.updateSingleActivity, {
      eventId,
      activityId: selectedActivity.id,
      payload,
    });
    yield put(setSubmitSucceeded(ADD_FILE_FORM_NAME));
    yield put(ModalHandlers.close(ADD_FILE_FORM_NAME));
    yield put(actions.uploadObjectSuccess());
  } catch (e) {
    const { invalid } = e.response.data.error;
    yield put(stopSubmit(ADD_FILE_FORM_NAME, invalid));
    yield put(actions.uploadObjectFailed(invalid));
  }
}

function* saga() {
  yield takeLatest(AT.UPLOAD_OBJECT, uploadObject);
}

export default [
  saga,
  handleLoadingObjectStoreSagas,
  handleSavingObjectStoreSagas,
  getSaga(AT.FETCH_GROUPS, api.fetchObjectStoreGroups, 'groups'),
  getSaga(AT.FETCH_CATEGORIES, api.fetchObjectStoreCategories, 'categories'),
  getSaga(AT.DOWNLOAD_OBJECT, api.downloadFile),
  getUpdateSaga(AT.DELETE_OBJECT, api.removeFile),
];
