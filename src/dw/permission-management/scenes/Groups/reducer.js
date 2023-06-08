import { combineReducers } from 'redux';
import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';

import {
  AVAILABLE_COMPANY_GROUP_USERS_LIST_MODAL_PREFIX,
  AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX,
} from 'dw/permission-management/scenes/constants';
import { createPermissionsReducer } from '../reducerCreators';
import {
  GROUPS_LIST_PREFIX,
  CONTENT_TYPES_PREFIX,
  OBJECT_PERMISSIONS_PREFIX,
  GROUP_USERS_LIST_PREFIX,
} from './constants';

const fetchGroupsListReducer = createFetchReducer(GROUPS_LIST_PREFIX);
const contentTypesReducer = createFetchReducer(CONTENT_TYPES_PREFIX);

export const INITIAL_STATE = {
  data: [],
  nextPageToken: undefined,
  next: undefined,
  params: undefined,
  loading: false,
};

const fetchGroupUsersListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${GROUP_USERS_LIST_PREFIX}_FETCH`: {
      return {
        ...state,
        data: action.append ? state.data : [],
        params: action.params,
        loading: true,
      };
    }
    case `${GROUP_USERS_LIST_PREFIX}_FETCH_SUCCESS`:
      return {
        ...state,
        data: action.append ? [...state.data, ...action.data] : action.data,
        nextPageToken: action.nextPageToken,
        next: action.next,
        loading: false,
      };
    case `${GROUP_USERS_LIST_PREFIX}_FETCH_FAILED`:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const createAvailableGroupReducer =
  actionPrefix =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case `${actionPrefix}_FETCH`: {
        return {
          ...state,
          data: action.append ? state.data : [],
          params: action.params,
          loading: true,
        };
      }
      case `${actionPrefix}_FETCH_SUCCESS`:
        return {
          ...state,
          data: action.append ? [...state.data, ...action.data] : action.data,
          nextPageToken: action.nextPageToken,
          next: action.next,
          loading: false,
        };
      case `${actionPrefix}_FETCH_FAILED`:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  };

const objectPermissionsReducer = createPermissionsReducer(
  OBJECT_PERMISSIONS_PREFIX
);

export const reducer = combineReducers({
  Groups: fetchGroupsListReducer,
  ContentTypes: contentTypesReducer,
  ObjectPermissions: objectPermissionsReducer,
  GroupUsers: fetchGroupUsersListReducer,
  AvailableGroupUsers: createAvailableGroupReducer(
    AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX
  ),
  AvailableGroupUsersModal: createAvailableGroupReducer(
    AVAILABLE_COMPANY_GROUP_USERS_LIST_MODAL_PREFIX
  ),
});
