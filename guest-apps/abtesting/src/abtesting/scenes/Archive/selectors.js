import { createSelector } from 'reselect';

import { TEST_STATUS } from 'dw/abtesting-utils';

export const archivedTestsSelector = createSelector(
  propTests => propTests,
  tests =>
    tests
      .filter(t => t.status === TEST_STATUS.ARCHIVED)
      .map(test => ({ ...test, testStatus: 'Archive' }))
);
