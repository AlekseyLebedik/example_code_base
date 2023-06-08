import { createSelector } from 'reselect';

import { TEST_STATUS } from 'dw/abtesting-utils';

export const killedTestsSelector = createSelector(
  propTests => propTests,
  tests =>
    tests
      .filter(t => t.status === TEST_STATUS.KILLED)
      .map(test => ({ ...test, testStatus: 'Killed' }))
);
