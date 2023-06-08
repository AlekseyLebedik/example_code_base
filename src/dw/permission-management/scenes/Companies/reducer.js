import { combineReducers } from 'redux';
import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';

import {
  AVAILABLE_COMPANY_GROUP_USERS_LIST_PREFIX as SELECTED_USERS_LIST_PREFIX,
  AVAILABLE_COMPANY_GROUP_USERS_LIST_MODAL_PREFIX as AVAILABLE_USERS_LIST_PREFIX,
} from 'dw/permission-management/scenes/constants';

import { createPermissionsReducer } from '../reducerCreators';
import { CONTENT_TYPES_PREFIX, OBJECT_PERMISSIONS_PREFIX } from './constants';

export const INITIAL_STATE = {
  data: [],
  nextPageToken: undefined,
  params: undefined,
  loading: false,
};

const createAvailableReducer =
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

const contentTypesReducer = createFetchReducer(CONTENT_TYPES_PREFIX);

const objectPermissionsReducer = createPermissionsReducer(
  OBJECT_PERMISSIONS_PREFIX
);

export const reducer = combineReducers({
  ContentTypes: contentTypesReducer,
  ObjectPermissions: objectPermissionsReducer,
  AvailableUsers: createAvailableReducer(AVAILABLE_USERS_LIST_PREFIX),
  Users: createAvailableReducer(SELECTED_USERS_LIST_PREFIX),
});
