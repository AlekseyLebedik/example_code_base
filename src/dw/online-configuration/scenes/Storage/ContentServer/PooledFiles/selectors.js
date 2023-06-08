import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';
import { formatFileSize } from 'dw/core/helpers/formatters';

const pooledFilesSelector = state =>
  state.Scenes.Storage.ContentServer.PooledFiles.entries;

export const pooledFilesFormattedSelector = createSelector(
  pooledFilesSelector,
  formatDateTimeSelector,
  (pooledFiles, formatDateTime) =>
    pooledFiles.map(pooledFile => ({
      ...pooledFile,
      fileID: parseInt(pooledFile.fileID, 10),
      fileSize: formatFileSize(pooledFile.fileSize),
      createTime: formatDateTime(pooledFile.createTime),
      updateTime: formatDateTime(pooledFile.updateTime),
    }))
);

const selectedPooledFileSelector = state =>
  state.Scenes.Storage.ContentServer.PooledFiles.selectedFile;

const selectedPooledFileNotFormattedSelector = createSelector(
  pooledFilesSelector,
  selectedPooledFileSelector,
  (pooledFiles, selectedPooledFile) => {
    if (selectedPooledFile === undefined || null) {
      return undefined;
    }
    return pooledFiles.find(
      x => x.fileID === selectedPooledFile.fileID.toString()
    );
  }
);

export const selectedPooledFileFormattedSelector = createSelector(
  selectedPooledFileNotFormattedSelector,
  formatDateTimeSelector,
  (selectedPooledFile, formatDateTime) => {
    if (selectedPooledFile === undefined) {
      return undefined;
    }
    return {
      ...selectedPooledFile,
      fileID: parseInt(selectedPooledFile.fileID, 10),
      fileSize: formatFileSize(selectedPooledFile.fileSize),
      createTime: formatDateTime(selectedPooledFile.createTime),
      updateTime: formatDateTime(selectedPooledFile.updateTime),
    };
  }
);
