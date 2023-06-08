import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as creators from 'playpants/components/App/actionCreators';
import * as AT from './actionTypes';

export const fetchGroups = creators.fetchGroups(AT.FETCH_GROUP_LIST);

export const fetchResponsibilityOptions = params =>
  createFetch(AT.FETCH_RESPONSIBILITY_OPTIONS, null, params);

export const fetchResponsibilityGroups = params =>
  createFetch(AT.FETCH_RESPONSIBILITY_GROUPS, null, params);

export const createResponsibilityGroups = params => ({
  type: AT.CREATE_RESPONSIBILITY_GROUPS,
  params,
});
export const createResponsibilityGroupsSuccess = response => ({
  type: AT.CREATE_RESPONSIBILITY_GROUPS_SUCCESS,
  response: [response],
});
export const createResponsibilityGroupsFailed = error => ({
  type: AT.CREATE_RESPONSIBILITY_GROUPS_FAILED,
  error,
});

export const updateResponsibilities = params => ({
  type: AT.UPDATE_RESPONSIBILITIES,
  params,
});
export const updateResponsibilitiesSuccess = response => ({
  type: AT.UPDATE_RESPONSIBILITIES_SUCCESS,
  response,
});
export const updateResponsibilitiesFailed = error => ({
  type: AT.UPDATE_RESPONSIBILITIES_FAILED,
  error,
});
