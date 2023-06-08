import { createSelector } from 'reselect';
import { get } from 'lodash';
import { hasData } from 'dw/core/helpers/object';

export const publisherObjectsSelector = state =>
  state.Scenes.ObjectStore.PublisherObjects.objects.data;

export const publisherObjectsLoadingSelector = state =>
  state.Scenes.ObjectStore.PublisherObjects.objects.loading;

export const publisherGroupSelector = state =>
  state.Scenes.ObjectStore.PublisherObjects.groups.data;

export const uploadingFilesSelector = state =>
  state.Scenes.ObjectStore.PublisherObjects.uploadProgress.files;

const publisherGroupByIdSelector = createSelector(
  publisherGroupSelector,
  (groups = []) => {
    const groupById = groups.reduce(
      (acc, { groupID, groupName }) => ({
        ...acc,
        0: 'Global',
        [groupID]: groupName,
      }),
      {}
    );
    return hasData(groupById) ? groupById : { 0: 'Global' };
  }
);

const mergeData = (objects, groups) => {
  if (!objects || !groups) {
    return [];
  }
  const result = objects.map(object => ({
    ...object,
    groupName: get(groups, object.groupID),
  }));
  return result;
};

export const mergedDataSelector = createSelector(
  publisherObjectsSelector,
  publisherGroupByIdSelector,
  mergeData
);

export const dataFormatterSelector = createSelector(
  publisherGroupByIdSelector,
  groups => objects => mergeData(objects, groups)
);

export const publisherCategoriesSelector = state =>
  state.Scenes.ObjectStore.PublisherObjects.categories.data &&
  state.Scenes.ObjectStore.PublisherObjects.categories.data.length > 0
    ? state.Scenes.ObjectStore.PublisherObjects.categories.data.map(x => x.name)
    : [];

export const publisherNextPageTokenSelector = state =>
  state.Scenes.ObjectStore.PublisherObjects.objects.nextPageToken;

export const currentSizeSelector = state => {
  if (!state.Scenes.ObjectStore.PublisherObjects.objects.data) return 0;
  return state.Scenes.ObjectStore.PublisherObjects.objects.data.length;
};
