import { createSelector } from 'reselect';

export const groupsListSelector = state =>
  state.Scenes.ObjectStore.ObjectGroups.groups.data;

const categoriesDataSelector = state =>
  state.Scenes.ObjectStore.ObjectGroups.categories.data;

export const categoriesSelector = createSelector(
  categoriesDataSelector,
  categories =>
    categories && categories.length > 0 ? categories.map(x => x.name) : []
);

const detailsSelector = state =>
  state.Scenes.ObjectStore.ObjectGroups.groupDetails;

export const groupMembersSelector = createSelector(
  detailsSelector,
  ({ members = [] }) =>
    members.map(({ userID: id, userName: username, accountType }) => ({
      id,
      username,
      accountType,
    }))
);

export const groupDetailsLoadingSelector = createSelector(
  detailsSelector,
  ({ loading }) => loading
);

export const selectedItemIdSelector = (_, props) => props.match.params.id;

export const selectedItemSelector = createSelector(
  selectedItemIdSelector,
  groupsListSelector,
  (id, items) =>
    items && id
      ? items.find(item => item.groupID.toString() === id.toString())
      : null
);

const groupObjectsSelector = state =>
  state.Scenes.ObjectStore.ObjectGroups.objects.data;

export const groupObjectsCountSelector = createSelector(
  groupObjectsSelector,
  objects => (objects ? objects.length : 0)
);

const mergeData = (objects, groups) => {
  const result = objects.map(object => ({
    ...object,
    groupName: groups
      .filter(group => String(object.groupID) === group.groupID)
      .map(group => group.groupName)
      .join(''),
  }));
  return result;
};

export const mergedDataSelector = createSelector(
  groupObjectsSelector,
  groupsListSelector,
  mergeData
);

export const dataFormatterSelector = createSelector(
  groupsListSelector,
  groups => objects => mergeData(objects, groups)
);

export const baseUrlSelector = (_, props) =>
  props.match.params.id ? props.match.path.split(':id')[0] : props.match.path;
