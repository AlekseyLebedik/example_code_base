import { getSaga, getUpdateSaga } from '@demonware/devzone-core/helpers/sagas';
import { takeLatest, put, take } from 'redux-saga/effects';
import { templates as api } from 'playpants/services';
import { clearEventStore } from '../Event/actions';
import * as AT from './actionTypes';
import * as actions from './actions';

function* deleteThenRedirect({ templateId, redirect }) {
  yield put(actions.deleteTemplate(templateId));
  yield take(`${AT.DELETE_TEMPLATE}_UPDATE_SUCCESS`);
  yield put(clearEventStore());
  redirect();
}

function* saga() {
  yield takeLatest(AT.DELETE_THEN_REDIRECT, deleteThenRedirect);
}

export default [
  saga,
  getSaga(AT.SEARCH_TEMPLATES, api.fetchTemplates, 'results'),
  getUpdateSaga(AT.DELETE_TEMPLATE, api.deleteTemplate),
];
