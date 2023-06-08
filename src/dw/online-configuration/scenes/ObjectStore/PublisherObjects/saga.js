import { call, put, takeEvery } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import download from 'downloadjs';

import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import * as API from 'dw/online-configuration/services/objectStore';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { getFormError } from 'dw/core/helpers/form-error';

import { FORM_NAME as ADD_CATEGORY_FORM_NAME } from './components/AddCategory/components/AddCategoryForm/constants';

import { GROUPS_LIST_PREFIX, CATEGORIES_LIST_PREFIX } from './constants';

import * as Actions from './actions';
import { ADD_CATEGORY, MULTI_PUBLISHER_OBJECT_DOWNLOAD } from './actionTypes';

const fetchCategoriesSaga = getSaga(
  CATEGORIES_LIST_PREFIX,
  API.getPublisherCategories,
  'categories'
);

const fetchPublisherGroupsSaga = getSaga(
  GROUPS_LIST_PREFIX,
  API.getPublisherGroups,
  'groups'
);

function* addCategory(action) {
  try {
    const { name, params } = action;
    yield call(API.postPublisherCategory, { name }, params);
    yield put(Actions.fetchPublisherCategories());
    yield put(ModalHandlers.close(ADD_CATEGORY_FORM_NAME));
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors) {
      throw new SubmissionError(validationErrors);
    } else {
      yield put(
        GlobalSnackBarActions.show(
          e.response ? e.response.data.error.msg : e.toString(),
          'error'
        )
      );
    }
  }
}

function* downloadMultiPublisherObjects(action) {
  try {
    const { data } = yield call(API.getPublisherObjects, action.params);
    download(data.fileData, data.fileName);
    yield put(Actions.downloadMultiPublisherObjectsSuccess());
  } catch (e) {
    yield put(
      GlobalSnackBarActions.show('Download not successful. Try Again', 'error')
    );
  }
}

function* saga() {
  yield takeEvery(ADD_CATEGORY, addCategory);
  yield takeEvery(
    `${MULTI_PUBLISHER_OBJECT_DOWNLOAD}_FETCH`,
    downloadMultiPublisherObjects
  );
}

export default [fetchPublisherGroupsSaga, fetchCategoriesSaga, saga];
