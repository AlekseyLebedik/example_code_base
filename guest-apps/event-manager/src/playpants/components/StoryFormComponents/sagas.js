import { call, put, select, takeLatest } from 'redux-saga/effects';
import compact from 'lodash/compact';
import { startSubmit, stopSubmit, reset, change } from 'redux-form';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { currentProjectSelector } from 'playpants/components/App/selectors';
import * as actions from './actions';

const getFormValues = params => ({
  category: params.category !== 'All' ? params.category : null,
  context: params.context || null,
  description: params.description,
  name: params.name,
  schedule: params.schedule || null,
  title_env: params.title_env || null,
});

const getMessage = ({ story, project, verbiage }) =>
  ` Successfully ${verbiage} '${story}' on '${project}'`;

const ACTION_PROPS = {
  create: {
    success: actions.createStorySuccess,
    failed: actions.createStoryFailed,
  },
  patch: {
    success: actions.patchStorySuccess,
    failed: actions.patchStoryFailed,
  },
};

function* formRequestSaga({
  actionPrefix,
  apiCallFn,
  urlId,
  params,
  form,
  action,
  message,
  redirect,
}) {
  const actionProps = ACTION_PROPS[action];
  try {
    const { data } = yield call(...compact([apiCallFn, urlId, params]));
    yield put(actionProps.success(actionPrefix, data));
    yield put(ModalHandlers.close(form));
    yield put(reset(form));
    yield put(GlobalSnackBarActions.show(message, 'success'));
    if (redirect) redirect(data.id); // redirect when fn is available
  } catch (e) {
    yield put(actionProps.failed(actionPrefix, e));
    yield put(nonCriticalHTTPError(e));
    yield put(stopSubmit(form));
  }
}

function* createStory(
  { form, params, redirect },
  apiCallFn,
  actionPrefix,
  onSubmitValidation
) {
  let isValidated = true;
  const { id: project, name } = yield select(currentProjectSelector);
  if (onSubmitValidation) {
    const { validationState, errorMsg } = yield call(onSubmitValidation, {
      form,
      params: { ...params, project },
      apiCallFn,
    });
    isValidated = validationState;
    if (!isValidated) {
      yield put(GlobalSnackBarActions.show(errorMsg, 'error'));
    }
  }
  if (isValidated) {
    yield put(startSubmit(form));
    yield call(formRequestSaga, {
      actionPrefix,
      apiCallFn,
      params: { project, ...getFormValues(params) },
      form,
      action: 'create',
      message: getMessage({
        story: params.name,
        project: name,
        verbiage: 'created',
      }),
      redirect,
    });
    yield put(stopSubmit(form));
  }
}

function* patchStory({ form, params }, apiCallFn, actionPrefix) {
  yield put(startSubmit(form));
  const formValues = getFormValues(params);

  const { name } = yield select(currentProjectSelector);
  yield call(formRequestSaga, {
    actionPrefix,
    apiCallFn,
    urlId: params.storyId,
    params: formValues,
    form,
    action: 'patch',
    message: getMessage({
      story: params.name,
      project: name,
      verbiage: 'changed',
    }),
  });

  yield put(stopSubmit(form));
}

function* uploadSchedule(
  {
    scheduleType,
    scheduleFormData,
    clearFileCb,
    closeDrawerCb,
    setAsDefaultCb,
  },
  apiCallFn,
  actionPrefix
) {
  const { id: project, name: projectName } = yield select(
    currentProjectSelector
  );
  const formData = new FormData();
  formData.append('schedule_type', scheduleType);
  formData.append('schedule_file', scheduleFormData);
  formData.append('project', project);
  try {
    const { data } = yield call(apiCallFn, formData);
    clearFileCb();
    closeDrawerCb();
    yield put(
      GlobalSnackBarActions.show(
        getMessage({
          story: data.name,
          project: projectName,
          verbiage: 'uploaded',
        }),
        'success'
      )
    );
    yield put(actions.uploadScheduleSuccess(actionPrefix, data));
    if (setAsDefaultCb) {
      setAsDefaultCb(data.id);
    }
  } catch (e) {
    clearFileCb();
    yield put(nonCriticalHTTPError(e));
    yield put(actions.uploadScheduleFailed(actionPrefix, e));
  }
}

function* setSelectedSchedule({ form, schedule }) {
  yield put(change(form, 'schedule', schedule));
}

export const createStorySaga = (actionPrefix, apiCallFn, onSubmitValidation) =>
  function* saga() {
    yield takeLatest(actionPrefix, action =>
      createStory(action, apiCallFn, actionPrefix, onSubmitValidation)
    );
  };

export const patchStorySaga = (actionPrefix, apiCallFn) =>
  function* saga() {
    yield takeLatest(actionPrefix, action =>
      patchStory(action, apiCallFn, actionPrefix)
    );
  };

export const uploadScheduleSaga = (actionPrefix, apiCallFn) =>
  function* saga() {
    yield takeLatest(actionPrefix, action =>
      uploadSchedule(action, apiCallFn, actionPrefix)
    );
  };

export const setSelectedScheduleSaga = actionPrefix =>
  function* saga() {
    yield takeLatest(actionPrefix, setSelectedSchedule);
  };
