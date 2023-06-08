import { createSelector } from 'reselect';

import { companiesSelector, companyGroupsSelector } from '../../selectors';

export const entitiesSelector = createSelector(
  [companiesSelector, companyGroupsSelector],
  (companies, groups) => [
    ...companies.map(company => ({ ...company, type: 'company' })),
    ...groups.map(group => ({ ...group, type: 'group' })),
  ]
);
