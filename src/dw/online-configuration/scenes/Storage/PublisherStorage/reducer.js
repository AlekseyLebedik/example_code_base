import * as AT from './actionTypes';
import { PUBLISHER_STORAGE_DETAILS_DELETE_FILE_SUCCESS } from './components/PublisherStorageDetails/actionTypes';

const INITIAL_STATE = {
  entries: [],
  nextPageToken: undefined,
  selectedFile: undefined,
  elementsOrder: [],
  q: undefined,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.PUBLISHER_STORAGE_FETCH_SUCCESS:
      return {
        ...state,
        entries: action.append
          ? [...state.entries, ...action.entries]
          : action.entries,
        nextPageToken: action.nextPageToken,
        elementsOrder: action.elementsOrder,
        selectedFile: undefined,
        q: action.q,
      };
    case AT.PUBLISHER_STORAGE_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedFile: action.file,
      };
    case AT.PUBLISHER_STORAGE_FILES_UPLOAD_SUCCESS:
      return {
        ...state,
        entries: [...state.entries, action.file],
        selectedFile: action.file,
      };
    case PUBLISHER_STORAGE_DETAILS_DELETE_FILE_SUCCESS:
      return {
        ...state,
        entries: state.entries.filter(file => file.fileID !== action.fileID),
        selectedFile: undefined,
      };
    case AT.PUBLISHER_STORAGE_FILES_BULK_DELETE_SUCCESS:
      return {
        ...state,
        entries: state.entries.filter(
          file => !action.fileIds.includes(file.fileID)
        ),
        selectedFile: undefined,
      };
    default:
      return state;
  }
};
