import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { formatFileSize } from 'dw/core/helpers/formatters';

const userContextStorageFilesSelector = state =>
  state.Scenes.Storage.UserContextStorage.entries;

export const userContextStorageFilesFormattedSelector = createSelector(
  userContextStorageFilesSelector,
  formatDateTimeSelector,
  (userFiles, formatDateTime) =>
    userFiles.map(userFile => ({
      ...userFile,
      fileSize: formatFileSize(userFile.fileSize),
      updateTime: formatDateTime(userFile.updateTime),
    }))
);

const selectedUserContextStorageFileSelector = state =>
  state.Scenes.Storage.UserContextStorage.selectedFile;

const selectedUserContextStorageFileNotFormattedSelector = createSelector(
  userContextStorageFilesSelector,
  selectedUserContextStorageFileSelector,
  (userContextStorageFiles, selectedUserContextStorageFile) => {
    if (selectedUserContextStorageFile === undefined) {
      return undefined;
    }
    return userContextStorageFiles.find(
      x => x.fileID === selectedUserContextStorageFile.fileID.toString()
    );
  }
);

export const selectedUserContextStorageFileFormattedSelector = createSelector(
  selectedUserContextStorageFileNotFormattedSelector,
  formatDateTimeSelector,
  (selectedUserContextStorageFile, formatDateTime) => {
    if (selectedUserContextStorageFile === undefined) {
      return undefined;
    }
    return {
      ...selectedUserContextStorageFile,
      fileSize: formatFileSize(selectedUserContextStorageFile.fileSize),
      updateTime: formatDateTime(selectedUserContextStorageFile.updateTime),
    };
  }
);
