import { call, put, takeLatest } from 'redux-saga/effects';

import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import {
  getScripts,
  uploadScript,
} from 'dw/online-configuration/services/scriptLaunch';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as AT from './actionTypes';
import * as Actions from './actions';
import { SCRIPTS_LIST_PREFIX } from './constants';

const fetchScriptSaga = getSaga(SCRIPTS_LIST_PREFIX, params =>
  getScripts('loot-generation', params)
);

function* uploadScriptFn(action) {
  const { data } = action;
  try {
    const response = yield call(uploadScript, 'loot-generation', data);
    yield put(Actions.uploadScriptSuccess(response.data.data));
  } catch (e) {
    yield put(Actions.uploadScriptFailed(e));
  }
}

function* onUploadScriptSuccess() {
  yield put(GlobalSnackBarActions.show('Fetch Script Lists', 'success'));
}

function* onUploadScriptsFailed({ error }) {
  yield put(
    GlobalSnackBarActions.show(
      error.response ? error.response.data.error.msg : error.toString(),
      'error'
    )
  );
}

function* reloadScripts() {
  yield put(Actions.fetchScripts());
}

function* saga() {
  yield takeLatest(AT.UPLOAD_SCRIPT_POST, uploadScriptFn);
  yield takeLatest(AT.UPLOAD_SCRIPT_POST_FAILED, onUploadScriptsFailed);
  yield takeLatest(AT.UPLOAD_SCRIPT_POST_SUCCESS, onUploadScriptSuccess);

  // side-effect after upload script success load the list of scripts
  yield takeLatest(AT.UPLOAD_SCRIPT_POST_SUCCESS, reloadScripts);
}

export default [fetchScriptSaga, saga];
