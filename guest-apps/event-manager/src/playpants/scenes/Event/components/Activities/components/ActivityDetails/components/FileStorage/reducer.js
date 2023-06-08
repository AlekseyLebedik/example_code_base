import {
  INITIAL_STATE as FETCH_INITIAL_STATE,
  createFetchReducer,
} from '@demonware/devzone-core/helpers/reducers';
import * as AT from './actionTypes';

const contextsReducer = createFetchReducer(AT.FILESTORAGE_CONTEXTS_FETCH);
// TO BE ADDED IN NEXT PR
// const uploadProgressReducer = createFetchReducer(AT.UPLOAD_PROGRESS_FETCH);
// const reduceUploadProgress = progress =>
// isEmpty(progress) ? progress : { [progress.params.id]: { ...progress.data } };

// THIS WILL BE ADDED IN NEXT PR
// const fileDetailsReducer = createFetchReducer(AT.FILE_DETAILS_FETCH);

const INITIAL_STATE = {
  files: {},
  uploadProgress: {},
  contexts: FETCH_INITIAL_STATE,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.UPLOAD_FILE:
      return {
        ...state,
        loading: true,
        saved: false,
        error: {},
      };
    case AT.UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        files: { ...state.files, ...action.file },
        loading: false,
        saved: true,
        error: {},
      };
    // REMOVE IN NEXT PR
    case AT.FILE_DETAILS_FETCH_SUCCESS:
      return {
        ...state,
        files: action.files,
      };
    // REMOVE IN NEXT PR
    case AT.UPLOAD_PROGRESS_FETCH_SUCCESS:
      return {
        ...state,
        uploadProgress: {
          ...state.uploadProgress,
          [action.id]: action.progress,
        },
      };
    case AT.REMOVE_FILE_SUCCESS: {
      const newFiles = { ...state.files };
      delete newFiles[action.id];
      return {
        ...state,
        files: newFiles,
      };
    }
    default:
      return {
        ...state,
        contexts: contextsReducer(state.contexts, action),
        // TO BE ADDED IN NEXT PR
        // uploadProgress: reduceUploadProgress(
        //   uploadProgressReducer(state.uploadProgress, action)
        // ),
        // TO BE ADDED IN NEXT PR
        // fileDetails: fileDetailsReducer(state.fileDetails, action),
      };
  }
};

export default reducer;
