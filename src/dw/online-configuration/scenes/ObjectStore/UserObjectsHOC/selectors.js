import { createSelector } from 'reselect';

const userIdSelector = state => state.Scenes.ObjectStore.UserObjects.userId;
export const userObjectsNextPageTokenSelector = state =>
  state.Scenes.ObjectStore.UserObjects.nextPageToken;

export const userObjectsLoadingSelector = state =>
  state.Scenes.ObjectStore.UserObjects.loading;

export const isUserObjectsSelector = (state, { userId }) =>
  userIdSelector(state) === userId;

export const userObjectsSelector = createSelector(
  state => state.Scenes.ObjectStore.UserObjects.objects,
  isUserObjectsSelector,
  (objects, isUserObjects) => (isUserObjects ? Object.values(objects) : [])
);
