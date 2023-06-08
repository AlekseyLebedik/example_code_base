import { combineReducers } from 'redux';

import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';

import { createPermissionsReducer } from '../reducerCreators';
import {
  USERS_LIST_PREFIX,
  AVAILABLE_GROUPS_LIST_PREFIX,
  ASSIGNED_GROUPS_LIST_PREFIX,
  CONTENT_TYPES_PREFIX,
  OBJECT_PERMISSIONS_PREFIX,
  USER_MEMBERSHIPS_PREFIX,
} from './constants';

const fetchUsersListReducer = createFetchReducer(USERS_LIST_PREFIX);
const availableGroupsListReducer = createFetchReducer(
  AVAILABLE_GROUPS_LIST_PREFIX
);
const userMembershipsReducer = createFetchReducer(USER_MEMBERSHIPS_PREFIX);

const contentTypesReducer = createFetchReducer(CONTENT_TYPES_PREFIX);

const objectPermissionsReducer = createPermissionsReducer(
  OBJECT_PERMISSIONS_PREFIX
);

export const ASSIGNED_GROUPS_INITIAL_STATE = {
  data: [],
  nextPageToken: undefined,
  loading: false,
};

const assignedGroupsListReducer = (
  state = ASSIGNED_GROUPS_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case `${ASSIGNED_GROUPS_LIST_PREFIX}_FETCH`:
      return {
        ...state,
        loading: true,
      };
    case `${ASSIGNED_GROUPS_LIST_PREFIX}_FETCH_SUCCESS`:
      return {
        ...state,
        data: action.append ? [...state.data, ...action.data] : action.data,
        nextPageToken: action.nextPageToken,
        loading: false,
      };
    case `${ASSIGNED_GROUPS_LIST_PREFIX}_FETCH_FAILED`:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  Users: fetchUsersListReducer,
  Groups: availableGroupsListReducer,
  AssignedGroups: assignedGroupsListReducer,
  ContentTypes: contentTypesReducer,
  ObjectPermissions: objectPermissionsReducer,
  CompanyMemberships: userMembershipsReducer,
});
