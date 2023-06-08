import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const publisherFilesSelector = state =>
  state.Scenes.Storage.PublisherStorage.entries;

export const publisherFilesFormattedSelector = createSelector(
  publisherFilesSelector,
  formatDateTimeSelector,
  (publisherFiles, formatDateTime) =>
    publisherFiles.map(publisherFile => ({
      ...publisherFile,
      createTime: formatDateTime(publisherFile.createTime),
      updateTime: formatDateTime(publisherFile.updateTime),
    }))
);

const selectedFileSelector = state =>
  state.Scenes.Storage.PublisherStorage.selectedFile;

const selectedFileNotFormattedSelector = createSelector(
  publisherFilesSelector,
  selectedFileSelector,
  (publisherFiles, selectedFile) => {
    if (selectedFile === undefined) {
      return undefined;
    }
    return publisherFiles.find(
      x => x.fileID === selectedFile.fileID.toString()
    );
  }
);

export const selectedFileFormattedSelector = createSelector(
  selectedFileNotFormattedSelector,
  formatDateTimeSelector,
  (selectedFile, formatDateTime) => {
    if (selectedFile === undefined) {
      return undefined;
    }
    return {
      ...selectedFile,
      createTime: formatDateTime(selectedFile.createTime),
      updateTime: formatDateTime(selectedFile.updateTime),
    };
  }
);
