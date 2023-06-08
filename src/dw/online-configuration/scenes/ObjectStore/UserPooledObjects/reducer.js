import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';

import {
  createFetchReducer,
  INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';

import * as AT from './actionTypes';

const POOLED_OBJECT_INITIAL_STATE = {
  data: [],
  error: null,
  loading: false,
  nextPageToken: null,
};

const pooledObjectReducer = (state = POOLED_OBJECT_INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.POOLED_OBJECT_SEARCH:
      return {
        ...state,
        loading: true,
      };
    case AT.POOLED_OBJECT_SEARCH_SUCCESS:
      return {
        ...state,
        data: action.append
          ? [...state.data, ...action?.data?.data?.objects]
          : action?.data?.data?.objects,
        loading: false,
        nextPageToken: action?.data?.data?.nextPageToken,
      };
    case AT.POOLED_OBJECT_SEARCH_FAILED:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

const pooledObjectValidTagsReducer = createFetchReducer(
  AT.FETCH_POOLED_OBJECT_TAGS
);

export default combineReducers({
  pooledObjects: pooledObjectReducer,
  tags: reduceReducers(pooledObjectValidTagsReducer, INITIAL_STATE),
});
