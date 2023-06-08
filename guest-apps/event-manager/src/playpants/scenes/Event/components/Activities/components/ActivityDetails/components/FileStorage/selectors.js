import { createSelector } from 'reselect';
import { activitySelector } from 'playpants/scenes/Event/selectors';

export const fileStorageSelector = createSelector(
  activitySelector,
  activity => activity.filestorage
);

export const filesSelector = createSelector(
  fileStorageSelector,
  filestorage => filestorage.files
);

export const uploadProgressSelector = createSelector(
  fileStorageSelector,
  filestorage => filestorage.uploadProgress
);

export const contextsSelector = createSelector(
  fileStorageSelector,
  filestorage => filestorage.contexts
);

export const contextsDataSelector = createSelector(
  contextsSelector,
  contexts => contexts.data
);
