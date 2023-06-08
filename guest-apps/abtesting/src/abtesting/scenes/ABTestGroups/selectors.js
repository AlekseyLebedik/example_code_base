import { createSelector } from 'reselect';

export const groupsListSelector = state =>
  state.Scenes.ABTestGroups.groups.data;

export const loadingSelector = state =>
  state.Scenes.ABTestGroups.groups.loading;

export const detailsSelector = state => state.Scenes.ABTestGroups.groupDetails;

export const groupMembersSelector = createSelector(
  detailsSelector,
  ({ members = [] }) =>
    members.map(({ userID: id, userName: username }) => ({ id, username }))
);

export const groupDetailsLoadingSelector = createSelector(
  detailsSelector,
  ({ loading }) => loading
);

export const contextSelector = state =>
  state.Scenes.ABTestGroups.groups.params &&
  state.Scenes.ABTestGroups.groups.params.context;

export const selectedItemIdSelector = (_, props) => props.match.params.id;

export const makeSelectedItemSelector = () =>
  createSelector(selectedItemIdSelector, groupsListSelector, (id, items) =>
    items && id
      ? items.find(item => item.groupID.toString() === id.toString())
      : null
  );

export const baseUrlSelector = (_, props) =>
  props.match.params.id ? props.match.path.split(':id')[0] : props.match.path;
