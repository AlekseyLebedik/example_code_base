import { createSelector } from 'reselect';
import { CONFIG_FEATURE_FLAGS } from 'dw/config';
import {
  FEATURE_FLAG_TYPE,
  GAMEMODES_CHART_ENABLED,
} from './configFeatureFlags';

const userProfileSelector = state => state.user.profile;
const projectTitleSourceSelector = (_, { projectTitleSource }) =>
  projectTitleSource;

const requiredFeaturesSelector = (_, { configFeatureFlags }) =>
  Array.isArray(configFeatureFlags) ? configFeatureFlags : [configFeatureFlags];

const isStaffAllowedSelector = (_, { isStaffAllowed = true }) => isStaffAllowed;

const aggregatedSelector = (_, { aggregated = true }) => aggregated;

const includeValues = (value, entityId) => {
  const isArrayValue = Array.isArray(value);
  return isArrayValue ? value.includes(entityId) : value === entityId;
};

const featuresCheck = (features, projectTitleSource, currentUser) => {
  const requiredFeatures = Array.isArray(features) ? features : [features];
  const check = featureFlagName => {
    const configFeature = CONFIG_FEATURE_FLAGS[featureFlagName];

    /* if the configFeature doesn't exists has no access. */
    if (!configFeature) return false;

    /*
      If we needed it in the future, we can make more complicated this logic
      checking properties of the user like role, or checking part of a title name or
      project name.
    */
    const { type, value } = configFeature;
    switch (type) {
      case FEATURE_FLAG_TYPE.PROJECT:
        return !projectTitleSource || !projectTitleSource.project
          ? true
          : includeValues(value, projectTitleSource.project.id);
      case FEATURE_FLAG_TYPE.TITLE:
        return !projectTitleSource || !projectTitleSource.title
          ? true
          : includeValues(value, projectTitleSource.title.id);
      case FEATURE_FLAG_TYPE.USER:
        return !currentUser ? true : includeValues(value, currentUser.id);
      default:
        return true;
    }
  };

  return requiredFeatures.map(check);
};

export const makeHasFeaturesEnabledSelector = (
  sourceSelector = projectTitleSourceSelector
) =>
  createSelector(
    requiredFeaturesSelector,
    userProfileSelector,
    sourceSelector,
    isStaffAllowedSelector,
    aggregatedSelector,
    (
      requiredFeatures,
      currentUser,
      projectTitleSource,
      isStaffAllowed = true,
      aggregated = true
    ) => {
      if (!requiredFeatures.includes(GAMEMODES_CHART_ENABLED)) {
        if (
          (currentUser.isStaff && isStaffAllowed) ||
          requiredFeatures.length === 0
        )
          return aggregated ? true : requiredFeatures.map(() => true);
      }
      const result = featuresCheck(
        requiredFeatures,
        projectTitleSource,
        currentUser
      );
      return aggregated ? result.every(v => v) : result;
    }
  );

export const hasFeaturesEnabledFuncSelector = createSelector(
  userProfileSelector,
  currentUser =>
    (requiredFeatures, projectTitleSource, isStaffAllowed = true) => {
      if (isStaffAllowed && currentUser.isStaff) return true;
      const result = featuresCheck(
        requiredFeatures,
        projectTitleSource,
        currentUser
      );
      return result.every(v => v);
    }
);
