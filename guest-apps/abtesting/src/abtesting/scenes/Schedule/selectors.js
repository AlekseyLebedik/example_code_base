import { createSelector } from 'reselect';
import { TEST_STATUS } from 'dw/abtesting-utils';

export const upcomingTestsSelector = createSelector(
  propTests => propTests,
  tests =>
    tests
      .filter(t =>
        [TEST_STATUS.CONFIG, TEST_STATUS.APPROVED].includes(t.status)
      )
      .map(test => ({ ...test, testStatus: 'Upcoming' }))
);

export const liveTestsSelector = createSelector(
  propTests => propTests,
  tests =>
    tests
      .filter(t => t.status === TEST_STATUS.ACTIVE)
      .map(test => ({
        ...test,
        testStatus: 'Live',
      }))
);

export const finishedTestsSelector = createSelector(
  propTests => propTests,
  tests =>
    tests
      .filter(t => t.status === TEST_STATUS.ANALYSIS)
      .map(test => ({ ...test, testStatus: 'Recently Finished' }))
);

export const scheduledTestsSelector = createSelector(
  upcomingTestsSelector,
  liveTestsSelector,
  finishedTestsSelector,
  (upcoming, live, finished) => [...upcoming, ...live, ...finished]
);
