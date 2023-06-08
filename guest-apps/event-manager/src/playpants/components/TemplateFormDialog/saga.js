import compact from 'lodash/compact';
import isEmpty from 'lodash/isEmpty';

import { takeLatest, select, put, call, take } from 'redux-saga/effects';
import { startSubmit, stopSubmit, reset } from 'redux-form';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { templates as api } from 'playpants/services';
import { getSecondsFromDuration } from 'playpants/helpers/dateTime';
import { currentProjectSelector } from 'playpants/components/App/selectors';
import { eventDataSelector } from 'playpants/scenes/Event/selectors';
import * as actions from './actions';
import * as AT from './actionTypes';

function formValues(params) {
  const {
    description,
    duration,
    hasEndDate,
    is_schedule: isSchedule,
    name,
    restrict_activities: restrictActivities,
    env_type: envType,
  } = params;
  return {
    description,
    duration: hasEndDate ? getSecondsFromDuration(duration) : null,
    is_schedule: isSchedule,
    name,
    restrict_activities: restrictActivities,
    env_type: envType,
  };
}

const getMessage = ({ template, project, verbiage }) =>
  ` Successfully ${verbiage} '${template}' on '${project}'`;

const ACTION_PROPS = {
  save: {
    success: actions.saveAsTemplateSuccess,
    failed: actions.saveAsTemplateFailed,
  },
  create: {
    success: actions.createTemplateSuccess,
    failed: actions.createTemplateFailed,
  },
  patch: {
    success: actions.patchTemplateSuccess,
    failed: actions.patchTemplateFailed,
  },
};

function* formRequestSaga({
  apiFn,
  urlId,
  params,
  form,
  action,
  message,
  redirect,
}) {
  const { isValidName } = yield take(AT.CHECK_TEMPLATE_NAME_SUCCESS);
  if (isValidName) {
    const actionProps = ACTION_PROPS[action];
    try {
      const { data } = yield call(...compact([apiFn, urlId, params]));
      yield put(actionProps.success(data));
      yield put(ModalHandlers.close(form));
      yield put(actions.clearError());
      yield put(reset(form));
      yield put(GlobalSnackBarActions.show(message, 'success'));
      if (redirect) redirect(data.source_event); // redirect when fn is available
    } catch (e) {
      yield put(actionProps.failed(e));
      yield put(nonCriticalHTTPError(e));
      yield put(stopSubmit(form));
    }
  }
}

function* checkTemplateName({ name, oldName }) {
  const { id: project } = yield select(currentProjectSelector);
  if (!oldName || (oldName && oldName !== name)) {
    try {
      const matched = yield call(api.fetchTemplates, {
        name__iexact: name,
        project,
      });
      yield put(
        actions.checkTemplateNameSuccess(isEmpty(matched.data.results))
      );
    } catch (e) {
      yield put(actions.checkTemplateNameFailed(e));
    }
  } else {
    yield put(actions.checkTemplateNameSuccess(true));
  }
}

function* saveAsTemplate({ form, params }) {
  yield put(startSubmit(form));
  yield put(actions.checkTemplateName(params.name));
  const { id } = yield select(eventDataSelector);
  const { id: project, name } = yield select(currentProjectSelector);
  yield call(formRequestSaga, {
    apiFn: api.createTemplates,
    params: { source_event: id, project, ...formValues(params) },
    form,
    action: 'save',
    message: getMessage({
      template: params.name,
      project: name,
      verbiage: 'created',
    }),
  });
  yield put(stopSubmit(form));
}

function* createTemplate({ form, params, redirect }) {
  yield put(startSubmit(form));
  yield put(actions.checkTemplateName(params.name));
  const { id: project, name } = yield select(currentProjectSelector);
  yield call(formRequestSaga, {
    apiFn: api.createTemplates,
    params: { source_event: null, project, ...formValues(params) },
    form,
    action: 'create',
    message: getMessage({
      template: params.name,
      project: name,
      verbiage: 'created',
    }),
    redirect,
  });
  yield put(stopSubmit(form));
}

function* patchTemplate({ form, params }) {
  yield put(startSubmit(form));
  yield put(actions.checkTemplateName(params.name, params.oldName));
  const { name } = yield select(currentProjectSelector);
  yield call(formRequestSaga, {
    apiFn: api.patchTemplate,
    urlId: params.templateId,
    params: formValues(params),
    form,
    action: 'patch',
    message: getMessage({
      template: params.name,
      project: name,
      verbiage: 'changed',
    }),
  });
  yield put(stopSubmit(form));
}

function* saga() {
  yield takeLatest(AT.CHECK_TEMPLATE_NAME, checkTemplateName);
  yield takeLatest(AT.PATCH_TEMPLATE, patchTemplate);
  yield takeLatest(AT.CREATE_TEMPLATE, createTemplate);
  yield takeLatest(AT.SAVE_AS_TEMPLATE, saveAsTemplate);
}

export default [saga];
