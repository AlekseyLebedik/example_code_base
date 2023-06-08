import * as AT from './actionTypes';
import { USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE_SUCCESS } from './components/UserContextStorageDetails/actionTypes';

const INITIAL_STATE = {
  entries: [],
  selectedFile: undefined,
  elementsOrder: [],
  q: undefined,
  contextsList: [],
  uploadModalVisible: false,
  reloadDetailPath: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.USER_CONTEXT_STORAGE_RELOAD_DETAILS:
      return {
        ...state,
        reloadDetailPath: action.path,
      };
    case AT.USER_CONTEXT_STORAGE_FETCH_SUCCESS:
      return {
        ...state,
        entries: action.append
          ? [...state.entries, ...action.entries]
          : action.entries,
        elementsOrder: action.elementsOrder,
        selectedFile: undefined,
        q: action.q,
      };
    case AT.USER_CONTEXT_STORAGE_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedFile: action.file,
      };
    case AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_CLOSE_MODAL:
      return {
        ...state,
        uploadModalVisible: false,
      };
    case AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_OPEN_MODAL:
      return {
        ...state,
        uploadModalVisible: true,
      };
    case AT.USER_CONTEXT_STORAGE_FILES_UPLOAD_SUCCESS:
      return {
        ...state,
        selectedFile: action.selectedFile,
        uploadModalVisible: false,
        q: action.q,
      };
    case USER_CONTEXT_STORAGE_DETAILS_DELETE_FILE_SUCCESS:
      return {
        ...state,
        entries: state.entries.filter(file => file.fileID !== action.fileID),
        selectedFile: undefined,
      };
    case AT.USER_CONTEXT_STORAGE_GET_STORAGE_CONTEXTS_SUCCESS:
      return {
        ...state,
        contextsList: action.contextsList,
      };
    default:
      return state;
  }
};
