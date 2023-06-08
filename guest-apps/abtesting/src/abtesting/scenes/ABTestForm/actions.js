import get from 'lodash/get';
import set from 'lodash/set';

import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import * as AT from './actionTypes';

export function fetchContextFailed(err) {
  return dispatch => {
    dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  };
}

export function fetchSegments(context) {
  return {
    type: AT.FETCH_SEGMENTS,
    context,
  };
}

export function fetchCategories(context) {
  return {
    type: AT.FETCH_CATEGORIES,
    context,
  };
}

export function fetchSegmentsSuccess(data, context) {
  return {
    type: AT.FETCH_SEGMENTS_SUCCESS,
    segments: data.data,
    context,
  };
}

export function fetchSegmentsFailed(err, context) {
  return dispatch => {
    dispatch({ type: AT.FETCH_SEGMENTS_FAILED, context });
    dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  };
}

export function deleteSegments(context, segmentIDs) {
  return {
    type: AT.DELETE_SEGMENTS,
    context,
    segmentIDs,
  };
}

export function deleteSegmentsSuccess(context, segmentIDs) {
  return {
    type: AT.DELETE_SEGMENTS_SUCCESS,
    context,
    segmentIDs,
  };
}

export function deleteSegmentsFailed(err) {
  return dispatch => {
    dispatch(nonCriticalHTTPError(err));
  };
}

export function fetchCategoriesSuccess(data) {
  return {
    type: AT.FETCH_CATEGORIES_SUCCESS,
    categories: data.data,
    context: data.context,
  };
}

export function fetchCategoriesFailed(err) {
  return dispatch => dispatch(nonCriticalHTTPError(err, true));
}

export function fetchFirstParties(context) {
  return {
    type: AT.FETCH_FIRST_PARTIES,
    context,
  };
}

export function fetchFirstPartiesSuccess(data) {
  return {
    type: AT.FETCH_FIRST_PARTIES_SUCCESS,
    firstParties: data.data,
    context: data.context,
  };
}

export function fetchFirstPartiesFailed(err) {
  return dispatch => dispatch(nonCriticalHTTPError(err, true));
}

export function fetchConfigs(context) {
  return {
    type: AT.FETCH_CONFIGS,
    context,
  };
}

export function fetchConfigsSuccess(data, context) {
  return {
    type: AT.FETCH_CONFIGS_SUCCESS,
    configs: data.data,
    context,
  };
}

export function fetchConfigsFailed(err, context) {
  return dispatch => {
    dispatch({ type: AT.FETCH_CONFIGS_FAILED, context });
    dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  };
}

export function saveConfig(values, context, resolve, reject, onAdd) {
  return {
    type: AT.SAVE_CONFIG,
    values,
    context,
    resolve,
    reject,
    onAdd,
  };
}

export function notifyCopyOfConfigurations(previousConfig) {
  return dispatch =>
    dispatch(
      GlobalSnackBarActions.show(
        `Creating a new config cloned from ${previousConfig.name} to this context.`,
        'info'
      )
    );
}

export function saveConfigSuccess(context, values, update = false) {
  return {
    type: !update ? AT.ADD_CONFIG_SUCCESS : AT.UPDATE_CONFIG_SUCCESS,
    context,
    values,
  };
}

export function saveConfigFailed(err) {
  return dispatch => dispatch(nonCriticalHTTPError(err, true));
}

export function saveTest(
  data,
  history,
  resolve,
  reject,
  testID,
  newCohorts,
  nonMatchingConfigs
) {
  return {
    type: AT.SAVE_TEST,
    data,
    history,
    resolve,
    reject,
    testID,
    newCohorts,
    nonMatchingConfigs,
  };
}

export function saveTestSuccess(history) {
  return dispatch => {
    dispatch({ type: AT.SAVE_TEST_SUCCESS });
    dispatch(GlobalSnackBarActions.show('Test saved successfully.', 'success'));
    history.push('/abtesting/schedule');
  };
}

export function saveTestFailed(err) {
  return dispatch => {
    dispatch({ type: AT.SAVE_TEST_FAILED });
    dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  };
}

export function uploadManualSourceFileFailed(
  err,
  history,
  titleID,
  environment,
  testID
) {
  return dispatch => {
    const msg = get(err, 'response.data.error.invalid[0].msg');
    if (msg) set(err, 'response.data.error.msg', msg);
    dispatch(
      GlobalSnackBarActions.show(
        `Test saved successfully. Manual cohort (user IDs) file upload failed with error: ${msg}`,
        'error'
      )
    );
    history.push(`/abtesting/edit/${titleID}/${environment}/${testID}`);
  };
}

export function fetchCohortUsers(context, testID, cohortID) {
  return {
    type: AT.FETCH_COHORT_USERS,
    context,
    testID,
    cohortID,
  };
}

export function fetchCohortUsersSuccess(data, cohortID) {
  return {
    type: AT.FETCH_COHORT_USERS_SUCCESS,
    users: data.data,
    cohortID,
  };
}

export function fetchCohortUsersFailed(err, cohortID) {
  return dispatch => {
    dispatch({ type: AT.FETCH_COHORT_USERS_FAILED, cohortID });
    dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  };
}

export function deleteCohortUsers(context, testID, cohortID) {
  return {
    type: AT.DELETE_COHORT_USERS,
    context,
    testID,
    cohortID,
  };
}

export function deleteCohortUsersSuccess(cohortID) {
  return {
    type: AT.DELETE_COHORT_USERS_SUCCESS,
    cohortID,
  };
}

export function deleteCohortUsersFailed(err) {
  return dispatch => {
    dispatch(GlobalSnackBarActions.show(err.response.data.error.msg, 'error'));
  };
}
