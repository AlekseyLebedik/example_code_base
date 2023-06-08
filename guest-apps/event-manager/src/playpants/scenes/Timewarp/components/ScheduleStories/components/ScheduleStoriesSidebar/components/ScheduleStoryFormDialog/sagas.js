import { takeLatest, put, call, select } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import set from 'lodash/set';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { change } from 'redux-form';
import { stories as storiesApi, event as eventApi } from 'playpants/services';
import {
  createStorySaga,
  patchStorySaga,
  uploadScheduleSaga,
  setSelectedScheduleSaga,
} from 'playpants/components/StoryFormComponents/sagas';
import { contextFieldPropsSelector } from './selectors';
import { setContextFieldProps } from './actions';
import * as AT from './actionTypes';
import { SCHEDULE_STORY_FORM } from './constants';

/**
 * With the given list of contexts, return the id of the context with context type higher priority
 *
 * Context type priority ranking:
 * - Title
 * - Any
 * - Empty
 *
 * If none are found with an id, return null
 * @param {[]} contexts - list of contexts
 */
function getDefaultOptionId(contexts) {
  const defaultOption =
    contexts.find(context => context.type === 'Title') ||
    contexts.find(context => context.type === 'Any') ||
    contexts.find(context => context.type === '') ||
    {};
  return defaultOption.id || null;
}
/**
 * On successful contexts fetch, set the context field props:
 *
 * - if the fetch contexts are empty, disable the context field and do not use default option
 * - if the fetch contexts are not empty and there are only non-userselectable options, disable the context field and use default option
 * - otherwise, enable the context field and do not use default option
 *
 * @param {[]} data - Context list fetched
 */
function* fetchContextSuccess({ data }) {
  const contextFieldProps = yield select(contextFieldPropsSelector);
  if (isEmpty(data)) {
    set(contextFieldProps, 'disabled', true);
    set(contextFieldProps, 'useDefaultOption', false);
  } else if (!data.find(context => context.userSelectable)) {
    set(contextFieldProps, 'disabled', true);
    set(contextFieldProps, 'useDefaultOption', true);
    yield put(change(SCHEDULE_STORY_FORM, 'context', getDefaultOptionId(data)));
  } else {
    set(contextFieldProps, 'disabled', false);
    set(contextFieldProps, 'useDefaultOption', false);
  }
  yield put(setContextFieldProps(contextFieldProps));
}

/**
 * On failed contexts fetch, set the context field props:
 *
 * Disable the context field and do not use default option
 */
function* fetchContextFailed() {
  const contextFieldProps = yield select(contextFieldPropsSelector);
  set(contextFieldProps, 'disabled', true);
  set(contextFieldProps, 'useDefaultOption', false);
  yield put(setContextFieldProps(contextFieldProps));
}

function* saga() {
  yield takeLatest(`${AT.FETCH_CONTEXTS}_FETCH_SUCCESS`, fetchContextSuccess);
  yield takeLatest(`${AT.FETCH_CONTEXTS}_FETCH_FAILED`, fetchContextFailed);
}

function* checkDuplicateStories(params) {
  const { data } = yield call(storiesApi.fetchStories, params);
  return data.count === 0;
}

/**
 * On create story form submission, check if no duplicates with the given properties exist:
 * - title_env
 * - project
 * - context
 *
 * If a duplicate exists, fail the validation and prompt global snack bar error msg
 * @param {*} props         - Parameters given from StoryFormComponent create story saga
 * @param {{}} props.params - Params to query with
 */
function* onSubmitValidation(props) {
  const { params } = props;
  const contextParam = params.context
    ? { context: params.context }
    : { context__isnull: true };
  const otherParams = {
    title_env: params.title_env,
    project: params.project,
  };
  const duplicateTitleEnvContextPairMsg =
    'The selected title env and context pair is already in use';
  const validationState = yield call(checkDuplicateStories, {
    ...contextParam,
    ...otherParams,
  });
  return { validationState, errorMsg: duplicateTitleEnvContextPairMsg };
}

export default [
  saga,
  getSaga(AT.FETCH_CONTEXTS, eventApi.fetchContexts),
  getSaga(
    AT.FETCH_CATEGORIES,
    eventApi.fetchObjectStoreCategories,
    'categories'
  ),
  createStorySaga(
    AT.CREATE_SCHEDULE_STORY,
    storiesApi.createStory,
    onSubmitValidation
  ),
  patchStorySaga(AT.PATCH_SCHEDULE_STORY, storiesApi.patchStory),
  uploadScheduleSaga(AT.UPLOAD_STORY_SCHEDULE, storiesApi.uploadSchedule),
  setSelectedScheduleSaga(AT.SET_SELECTED_SCHEDULE),
];
