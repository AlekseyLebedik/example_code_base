import { createSelector } from 'reselect';

import * as fs from './featureSwitches';
import { isStaffSelector } from '../../modules/user/selectors';

import { hasData } from '../../helpers/object';

const getFeatureSwitches = state =>
  hasData(state.switches) ? state.switches : null;

const canSeeT8ProjectSelector = state =>
  state.user && state.user.projects
    ? state.user.projects.map(project => project.id).includes(1141)
    : false;

const requiredFeaturesSelector = (_, { featureSwitches }) =>
  Array.isArray(featureSwitches) ? featureSwitches : [featureSwitches];

const isStaffAllowedSelector = (_, { isStaffAllowed }) => isStaffAllowed;

export const makeHasFeaturesEnabledSelector = () =>
  createSelector(
    requiredFeaturesSelector,
    getFeatureSwitches,
    isStaffSelector,
    isStaffAllowedSelector,
    (requiredFeatures, featureSwitches, isStaff, isStaffAllowed) => {
      if ((isStaff && isStaffAllowed) || requiredFeatures.length === 0)
        return true;
      if (featureSwitches === null) return null;

      const enabled = requiredFeatures.every(f => featureSwitches[f]);
      return Boolean(enabled);
    }
  );

export const hasFeaturesEnabledFuncSelector = createSelector(
  getFeatureSwitches,
  isStaffSelector,
  canSeeT8ProjectSelector,
  (featureSwitches, isStaff, canSeeT8Project) =>
    (requiredFeatures, isStaffAllowed = true) => {
      if (isStaffAllowed && isStaff) return true;
      if (featureSwitches === null) return null;
      const isString = typeof requiredFeatures === 'string';
      const switchesCheck = isString
        ? featureSwitches[requiredFeatures] !== undefined &&
          featureSwitches[requiredFeatures]
        : requiredFeatures && requiredFeatures.every(f => featureSwitches[f]);
      if (requiredFeatures === fs.REPORTING_UNIT_ENABLED && canSeeT8Project) {
        return true;
      }
      return Boolean(switchesCheck);
    }
);
