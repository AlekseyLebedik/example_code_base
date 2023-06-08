import { createSelector } from 'reselect';

import { companiesSelector } from 'dw/permission-management/scenes/selectors';

export const availableGroupUsersList = state =>
  state.Scenes.Groups.AvailableGroupUsersModal.data;

export const companyOptionsSelector = createSelector(
  companiesSelector,
  companies => companies
);

export const initialValuesSelector = createSelector(
  companiesSelector,
  companies => ({
    members: [],
    groupName: '',
    companyId: companies && companies.length > 0 ? companies[0].id : null,
  })
);
