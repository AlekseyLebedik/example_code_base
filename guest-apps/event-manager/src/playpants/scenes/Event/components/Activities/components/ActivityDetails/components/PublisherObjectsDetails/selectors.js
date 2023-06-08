import { createSelector } from 'reselect';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

const publisherObjectsState = state =>
  state.Scenes.Event.activity.publisherObjects;

const selectObjectsFromProps = (_, props) =>
  props.selectedActivity.activity.objects;

export const makePublisherObjectsSelector = () =>
  createSelector(selectObjectsFromProps, objects =>
    objects.map(obj => JSON.parse(obj))
  );

export const publisherGroupSelector = createSelector(
  publisherObjectsState,
  state => state.groups.data
);

export const publisherCategoriesSelector = createSelector(
  publisherObjectsState,
  state =>
    isEmpty(state.categories.data) ? [] : state.categories.data.map(x => x.name)
);

export const publisherObjectsLoadingSelector = createSelector(
  publisherObjectsState,
  ({ groups, categories }) => groups.loading || categories.loading
);

const publisherGroupByIdSelector = createSelector(
  publisherGroupSelector,
  groups =>
    groups.reduce(
      (acc, { groupID, groupName }) => ({
        ...acc,
        0: 'Global',
        [groupID]: groupName,
      }),
      {}
    )
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

export const dataFormatterSelector = createSelector(
  publisherGroupByIdSelector,
  groups => objects => mergeData(objects, groups)
);
