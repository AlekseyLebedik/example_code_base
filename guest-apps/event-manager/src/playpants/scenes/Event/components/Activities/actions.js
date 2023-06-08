import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

export const changeActivities = activityType => ({
  type: AT.CHANGE_ACTIVITIES_TYPE,
  activityType,
});

export const searchActivities = query => ({
  type: AT.ACTIVITIES_SEARCH,
  query,
});

export const createActivity = (activityType, dateType, callback) => ({
  type: AT.CREATE_ACTIVITY,
  activityType,
  dateType,
  callback,
});

export const createActivitySuccess = activity => ({
  type: AT.CREATE_ACTIVITY_SUCCESS,
  activity,
});

export const createActivityFailed = error => ({
  type: AT.CREATE_ACTIVITY_FAILED,
  error,
});

export const duplicateActivity = (activity, titleId) => ({
  type: AT.DUPLICATE_ACTIVITY,
  activity,
  titleId,
});

export const revertActivity = (activity, callback) => ({
  type: AT.REVERT_ACTIVITY,
  activity,
  callback,
});

export const deleteActivity = id => ({
  type: AT.DELETE_ACTIVITY,
  id,
});

export const deleteActivitySuccess = data => ({
  type: AT.DELETE_ACTIVITY_SUCCESS,
  data,
});

export const deleteActivityFailed = error => ({
  type: AT.DELETE_ACTIVITY_FAILED,
  error,
});

export const updateActivity = (selectedActivity, eventId) => ({
  type: AT.UPDATE_ACTIVITY,
  selectedActivity,
  eventId,
});

export const updateActivitySuccess = activity => ({
  type: AT.UPDATE_ACTIVITY_SUCCESS,
  activity,
});

export const updateActivityFailed = error => ({
  type: AT.UPDATE_ACTIVITY_FAILED,
  error,
});

export const updateThenRevertActivity = (selectedActivity, callback) => ({
  type: AT.UPDATE_THEN_REVERT_ACTIVITY,
  selectedActivity,
  callback,
});

export const fetchTitleEnvironment = envId =>
  createFetch(AT.TITLE_ENV_FETCH, envId);

export const fetchContexts = (titleId, env, contextType) =>
  createFetch(AT.CONTEXTS_FETCH, titleId, { env, contextType });
