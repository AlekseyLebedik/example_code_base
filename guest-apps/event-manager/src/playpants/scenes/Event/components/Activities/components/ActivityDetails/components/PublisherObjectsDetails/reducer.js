import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import * as AT from './actionTypes';

const INITIAL_STATE = {
  groups: {
    data: [],
    loading: false,
  },
  categories: {
    data: [],
    loading: false,
  },
  error: {},
};

const clearStateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CLEAR_PUBLISHER_OBJECTS:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

const ERROR_INITIAL_STATE = {
  error: {},
};

const groupedErrorsReducer = (state = ERROR_INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.UPLOAD_OBJECT_FAILED:
    case AT.DELETE_OBJECT_FAILED:
      return {
        ...state,
        ...action.error[0],
      };
    default:
      return {
        ...state,
      };
  }
};

export default reduceReducers(
  clearStateReducer,
  combineReducers({
    groups: createFetchReducer(AT.FETCH_GROUPS),
    categories: createFetchReducer(AT.FETCH_CATEGORIES),
    error: groupedErrorsReducer,
  })
);
