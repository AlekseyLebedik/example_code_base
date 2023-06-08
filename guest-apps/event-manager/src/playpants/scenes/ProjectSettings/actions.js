import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as creators from 'playpants/components/App/actionCreators';
import * as AT from './actionTypes';

export const fetchAvailableUsers = creators.fetchAvailableUsers(
  AT.FETCH_AVAILABLE_USERS
);

export const searchUsers = query => ({
  type: AT.SEARCH_USERS,
  query,
});

export const filterGroups = group => ({
  type: AT.FILTER_GROUPS,
  group,
});

export const changeTab = (tabType, selectedTab) => ({
  type: AT.CHANGE_TAB,
  tabType,
  selectedTab,
});

export const updateProjectSetting = (projectID, setting, data) => ({
  type: AT.UPDATE_PROJECT_SETTING,
  projectID,
  setting,
  data,
});

export const updateProjectSettingSucceed = settings => ({
  type: AT.UPDATE_PROJECT_SETTING_SUCCEED,
  settings,
});

export const fetchProjectSchema = schemaID =>
  createFetch(AT.FETCH_PROJECT_SCHEMA, null, { schemaID });

export const fetchProjectSchemaSucceed = schema => ({
  type: AT.FETCH_PROJECT_SCHEMA_SUCCEED,
  schema,
});

export const clearProjectSchema = () => ({
  type: AT.CLEAR_PROJECT_SCHEMA,
});

export const fetchFailed = error => dispatch =>
  dispatch(nonCriticalHTTPError(error));
