import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import {
  createFetchReducer,
  INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';
import { SCRIPTS_LIST_PREFIX } from './constants';

import * as AT from './actionTypes';

const fetchScriptsListReducer = createFetchReducer(SCRIPTS_LIST_PREFIX);

export const SCRIPTS_INITIAL_STATE = {
  ...INITIAL_STATE,
  uploading: false,
  uploadModalVisible: false,
};

const uploadReducer = (state = SCRIPTS_INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.UPLOAD_SCRIPT_POST: {
      return {
        ...state,
        uploading: true,
      };
    }
    case AT.UPLOAD_SCRIPT_POST_FAILED:
    case AT.UPLOAD_SCRIPT_POST_SUCCESS: {
      return {
        ...state,
        uploading: false,
        uploadModalVisible: false,
      };
    }
    case AT.UPLOAD_SCRIPT_CLOSE_MODAL:
      return {
        ...state,
        uploadModalVisible: false,
      };
    case AT.UPLOAD_SCRIPT_OPEN_MODAL:
      return {
        ...state,
        uploadModalVisible: true,
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  Scripts: reduceReducers(
    fetchScriptsListReducer,
    uploadReducer,
    SCRIPTS_INITIAL_STATE
  ),
});
