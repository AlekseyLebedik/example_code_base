import { createSelector } from 'reselect';

export const defaultRouteSelector = createSelector(
  routes => routes && routes.find(r => r.default)
);
