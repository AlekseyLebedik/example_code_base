import { createSelector } from 'reselect';

import { companyMembershipsLoading } from 'dw/permission-management/scenes/Users/selectors';

const assignedGroupsLoading = state =>
  state.Scenes.Users.AssignedGroups.loading;

export const assignedGroupsSelector = createSelector(
  state => state.Scenes.Users.AssignedGroups.data || [],
  assignedGroups => assignedGroups.map(g => g.id)
);

export const loadingSelector = createSelector(
  assignedGroupsLoading,
  companyMembershipsLoading,
  (...loading) => loading.some(l => l)
);
