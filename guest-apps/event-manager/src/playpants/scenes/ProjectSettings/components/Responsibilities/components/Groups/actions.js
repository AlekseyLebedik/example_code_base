import {
  createFetch,
  createUpdate,
} from '@demonware/devzone-core/helpers/actions';
import * as creators from 'playpants/components/App/actionCreators';
import * as AT from './actionTypes';

export const createGroup = creators.createGroup(AT.CREATE_GROUP);
export const createGroupSuccess = group =>
  creators.createGroupSuccess(`${AT.CREATE_GROUP}_SUCCESS`, group);

export const deleteGroup = creators.deleteGroup(AT.DELETE_GROUP);

export const fetchGroupMembers = id => createFetch(AT.FETCH_GROUP_MEMBERS, id);

export const updateGroupMembers = (groupId, params) =>
  createUpdate(AT.UPDATE_GROUP_MEMBERS, groupId, params);
