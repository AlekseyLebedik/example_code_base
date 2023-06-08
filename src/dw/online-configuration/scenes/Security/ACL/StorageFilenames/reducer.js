import * as AT from './actionTypes';

const INITIAL_STATE = {
  storageFilenames: [],
  addFilenameModalVisible: false,
  addFilenameModalSubmitting: false,
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.STORAGE_FILENAMES_FETCH_SUCCESS:
      return {
        ...state,
        storageFilenames: action.storageFilenames,
      };
    case AT.STORAGE_FILENAME_DELETE_SUCCESS:
      return {
        ...state,
        storageFilenames: state.storageFilenames.filter(
          item => !action.filenameIds.includes(item.id)
        ),
      };
    case AT.STORAGE_FILENAME_ADD_MODAL_OPEN:
      return {
        ...state,
        addFilenameModalVisible: true,
      };
    case AT.STORAGE_FILENAME_ADD:
      return {
        ...state,
        addFilenameModalSubmitting: true,
      };
    case AT.STORAGE_FILENAME_ADD_MODAL_CLOSE:
    case AT.STORAGE_FILENAME_ADD_SUCCESS:
    case AT.STORAGE_FILENAME_ADD_FAILED: {
      return {
        ...state,
        addFilenameModalVisible: false,
        addFilenameModalSubmitting: false,
      };
    }
    default:
      return state;
  }
};

export default reducer;
