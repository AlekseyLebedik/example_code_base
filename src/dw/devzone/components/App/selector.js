import { createSelector } from 'reselect';

export const criticalFetchFailedSelector = state => state.user.fetchFailed;

export const limitedModeSelector = createSelector(
  state => state.permissions.fetchFailed,
  state => state.switches.fetchFailed,
  (...errors) => errors.some(v => v)
);
