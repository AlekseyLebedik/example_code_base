import { flatten } from 'lodash';

import { getNowTimestamp } from 'dw/core/helpers/date-time';

import { TEST_STATUS } from './constants';

export * from './constants';

export const testStartSelector = test => {
  if (test.testPeriodStart) {
    return test.testPeriodStart;
  }
  const allStartDates = flatten(
    test.cohorts.map(cohort =>
      cohort.treatments.map(treatment => treatment.start)
    )
  );
  allStartDates.push(test.catchStart);
  const startDate = Math.min(...allStartDates);
  return startDate;
};

export const testEndSelector = test => {
  if (test.testPeriodEnd) {
    return test.testPeriodEnd;
  }
  const allEndDates = test.cohorts
    .map(cohort => cohort.treatments.map(treatment => treatment.end))
    .reduce((acc, currValue) => [...acc, ...currValue], []);
  allEndDates.push(test.catchEnd);
  const endDate = Math.max(...allEndDates);
  return endDate;
};

export const determineTestStatus = test => {
  if (test.status === 'configuration') {
    return TEST_STATUS.CONFIG;
  }
  if (test.status === TEST_STATUS.LIVE) {
    const now = getNowTimestamp();
    const startDate = testStartSelector(test);
    const endDate = testEndSelector(test);
    if (now < startDate) {
      return TEST_STATUS.APPROVED;
    }
    if (startDate < now && now < endDate) {
      return TEST_STATUS.ACTIVE;
    }
    if (now > endDate) {
      return TEST_STATUS.ANALYSIS;
    }
  }
  return test.status;
};
