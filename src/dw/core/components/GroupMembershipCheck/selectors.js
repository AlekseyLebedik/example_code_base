import { createSelector } from 'reselect';
import { userMembershipsSelector } from '@demonware/devzone-core/modules/user/selectors';

const requiredGroupsSelector = (_, { requiredGroups }) =>
  Array.isArray(requiredGroups) ? requiredGroups : [requiredGroups];

const getMemberships = state => {
  const memberships = userMembershipsSelector(state);
  return memberships.length > 0
    ? memberships.reduce((acc, i) => acc.concat(...i.groups), [])
    : null;
};

export const isInGroupsSelector = createSelector(
  requiredGroupsSelector,
  getMemberships,
  (requiredGroups, groups) => {
    if (groups === null) return null;
    if (requiredGroups.length === 0) return true;

    const enabled = requiredGroups.every(
      g => groups.filter(group => group.name === g).length > 0
    );
    return enabled;
  }
);
