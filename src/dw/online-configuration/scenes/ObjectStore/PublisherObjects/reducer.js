import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';

import {
  createFetchReducer,
  INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';
import { GROUPS_LIST_PREFIX, CATEGORIES_LIST_PREFIX } from './constants';
import {
  START_UPLOAD_PROGRESS,
  INCREMENT_UPLOAD_PROGRESS,
  STOP_UPLOAD_PROGRESS,
  FAIL_UPLOAD_PROGRESS,
} from './actionTypes';

import { OBJECTS_LIST_PREFIX } from '../constants';
import { getFileData } from './helpers';

const publisherGroupsReducer = createFetchReducer(GROUPS_LIST_PREFIX, {
  undefinedOnFail: true,
});
const publisherCategoriesReducer = createFetchReducer(CATEGORIES_LIST_PREFIX);

const publisherObjectsReducer = createFetchReducer(OBJECTS_LIST_PREFIX);

export const uploadProgressReducer = (state = { files: [] }, action) => {
  switch (action.type) {
    case START_UPLOAD_PROGRESS: {
      const { fileName, size } = getFileData(action);
      const { formData, cancelSource } = action;
      const file = { cancelSource, formData, fileName, progress: 5, size };
      return { ...state, files: [...state.files, file] };
    }
    case STOP_UPLOAD_PROGRESS: {
      let { fileName } = action;
      if (!fileName) ({ fileName } = getFileData(action));
      const files = state.files.filter(file => file.fileName !== fileName);
      return { ...state, files };
    }
    case INCREMENT_UPLOAD_PROGRESS: {
      const { fileName } = getFileData(action);
      const { progress } = action;
      const files = state.files.map(file =>
        file.fileName === fileName ? { ...file, progress } : file
      );
      return { ...state, files };
    }
    case FAIL_UPLOAD_PROGRESS: {
      const { fileName } = getFileData(action);
      const { error } = action;
      const files = state.files.map(file =>
        file.fileName === fileName ? { ...file, error } : file
      );
      return { ...state, files };
    }
    default:
      return state;
  }
};

export default combineReducers({
  objects: reduceReducers(publisherObjectsReducer, INITIAL_STATE),
  categories: publisherCategoriesReducer,
  groups: publisherGroupsReducer,
  uploadProgress: uploadProgressReducer,
});
