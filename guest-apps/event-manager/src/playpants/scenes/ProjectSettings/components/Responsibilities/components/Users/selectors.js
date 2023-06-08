import { createSelector } from 'reselect';
import differenceBy from 'lodash/differenceBy';
import { hasData } from 'dw/core/helpers/object';
import { responsibilitiesSelector, groupListSelector } from '../../selectors';

export const userStateSelector = createSelector(
  responsibilitiesSelector,
  resp => resp.user
);
export const assignedGroupsSelector = createSelector(
  userStateSelector,
  userState => userState.assignedGroups.data
);

export const initialValuesSelector = createSelector(
  groupListSelector,
  assignedGroupsSelector,
  (availableGroups, assignedGroups) =>
    !hasData(differenceBy(assignedGroups, availableGroups, 'id'))
      ? { groups: assignedGroups.map(data => `${data.id}`) }
      : undefined
);
