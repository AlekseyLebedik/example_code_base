import { createSelector } from 'reselect';

export const featureFlagSelector = state => state.Core.PermissionFeatureFlags;

export const featureFlagItemsSelector = createSelector(
  featureFlagSelector,
  featureFlagState => featureFlagState
);
