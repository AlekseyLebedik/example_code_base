import {
  createFetch,
  createUpdate,
} from '@demonware/devzone-core/helpers/actions';
import * as creators from 'playpants/components/App/actionCreators';
import * as AT from './actionTypes';

/** GROUPS */

export const fetchGroups = creators.fetchGroups(AT.FETCH_GROUPS);

export const clearGroups = () => ({
  type: `${AT.CLEAR_GROUPS}_FETCH`,
});

export const createGroup = creators.createGroup(AT.CREATE_GROUP);
export const createGroupSuccess = group =>
  creators.createGroupSuccess(`${AT.CREATE_GROUP}_SUCCESS`, group);

export const deleteGroup = creators.deleteGroup(AT.DELETE_GROUP);

/** ACCOUNTS */

export const fetchGroupAccounts = id =>
  createFetch(AT.FETCH_GROUP_ACCOUNTS, id);

export const clearGroupAccounts = () => ({
  type: `${AT.CLEAR_GROUP_ACCOUNTS}_FETCH`,
});

export const updateGroupAccounts = (groupId, params) =>
  createUpdate(AT.UPDATE_GROUP_ACCOUNTS, groupId, params);

/** TIMEWARP SETTINGS */

export const fetchGroupTimewarpSettings = id =>
  createFetch(AT.FETCH_GROUP_TIMEWARP_SETTINGS, id);

export const clearGroupTimewarpSettings = () => ({
  type: `${AT.CLEAR_GROUP_TIMEWARP_SETTINGS}_FETCH`,
});

export const updateGroupTimewarpSettings = (groupId, params) =>
  createUpdate(AT.UPDATE_GROUP_TIMEWARP_SETTINGS, groupId, params);
