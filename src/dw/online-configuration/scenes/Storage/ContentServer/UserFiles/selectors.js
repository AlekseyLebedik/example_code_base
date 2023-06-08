import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { formatFileSize } from 'dw/core/helpers/formatters';

const userFilesSelector = state =>
  state.Scenes.Storage.ContentServer.UserFiles.entries;

export const userFilesFormattedSelector = createSelector(
  userFilesSelector,
  formatDateTimeSelector,
  (userFiles, formatDateTime) =>
    userFiles.map(userFile => ({
      ...userFile,
      fileID: parseInt(userFile.fileID, 10),
      fileSize: formatFileSize(userFile.fileSize),
      createTime: formatDateTime(userFile.createTime),
      updateTime: formatDateTime(userFile.updateTime),
    }))
);

const selectedUserFileSelector = state =>
  state.Scenes.Storage.ContentServer.UserFiles.selectedFile;

const selectedUserFileNotFormattedSelector = createSelector(
  userFilesSelector,
  selectedUserFileSelector,
  (userFiles, selectedUserFile) => {
    if (selectedUserFile === undefined) {
      return undefined;
    }
    return userFiles.find(x => x.fileID === selectedUserFile.fileID.toString());
  }
);

export const selectedUserFileFormattedSelector = createSelector(
  selectedUserFileNotFormattedSelector,
  formatDateTimeSelector,
  (selectedUserFile, formatDateTime) => {
    if (selectedUserFile === undefined) {
      return undefined;
    }
    return {
      ...selectedUserFile,
      fileID: parseInt(selectedUserFile.fileID, 10),
      fileSize: formatFileSize(selectedUserFile.fileSize),
      createTime: formatDateTime(selectedUserFile.createTime),
      updateTime: formatDateTime(selectedUserFile.updateTime),
    };
  }
);
