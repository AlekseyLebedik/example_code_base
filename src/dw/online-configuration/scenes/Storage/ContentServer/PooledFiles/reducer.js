import * as AT from './actionTypes';

const INITIAL_STATE = {
  entries: [],
  nextPageToken: undefined,
  selectedFile: undefined,
  elementsOrder: [],
  q: undefined,
  uploadedFiles: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.STORAGE_POOLED_FILES_FETCH_SUCCESS: {
      let newEntries = [...action.entries];
      if (action.append && state.uploadedFiles.length !== 0) {
        state.uploadedFiles.forEach(fileID => {
          const idx = newEntries.findIndex(entry => fileID === entry.fileID);
          if (idx > -1) {
            newEntries = newEntries.splice(idx, 1);
          }
        });
      }
      return {
        ...state,
        entries: action.append ? [...state.entries, ...newEntries] : newEntries,
        nextPageToken: action.nextPageToken,
        elementsOrder: action.elementsOrder,
        q: action.q,
        uploadedFiles: action.append ? state.uploadedFiles : [],
      };
    }
    case AT.STORAGE_POOLED_FILES_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedFile: action.file,
      };
    case AT.STORAGE_POOLED_FILES_UPLOAD_SUCCESS:
      return {
        ...state,
        entries: [...state.entries, action.file],
        uploadedFiles: [...state.uploadedFiles, action.file.fileID],
        selectedFile: action.file,
      };
    case AT.STORAGE_POOLED_FILES_DELETE_SUCCESS:
      return {
        ...state,
        entries: state.entries.filter(
          file => parseInt(file.fileID, 10) !== action.fileID
        ),
        uploadedFiles: state.uploadedFiles.filter(
          fileID => fileID !== action.fileID
        ),
        selectedFile: undefined,
      };
    case AT.STORAGE_POOLED_FILES_SUMMARY_DELETE_SUCCESS:
      return {
        ...state,
        entries: state.entries.map(entry => {
          if (entry.fileID !== action.fileID) {
            return entry;
          }
          return {
            ...entry,
            summaryFileSize: '0',
          };
        }),
        selectedFile: {
          ...state.selectedFile,
          summaryFileSize: '0',
        },
      };
    default:
      return state;
  }
};
