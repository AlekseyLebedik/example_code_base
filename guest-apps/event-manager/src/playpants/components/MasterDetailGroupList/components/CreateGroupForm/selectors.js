import { createSelector } from 'reselect';
import { currentProjectIdSelector } from 'playpants/components/App/selectors';

export const initialValuesSelector = createSelector(
  currentProjectIdSelector,
  project => ({
    accounts: [],
    description: '',
    groupName: '',
    members: [],
    projectId: project,
    provider: 'uno',
    service: 'linkedAccounts',
  })
);
