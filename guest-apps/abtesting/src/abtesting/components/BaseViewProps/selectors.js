import { createSelector } from 'reselect';
import { TEST_STATUS } from 'dw/abtesting-utils';
import compact from 'lodash/compact';
import get from 'lodash/get';
import find from 'lodash/find';

const stateTests = state => state.Components.BaseViewProps.tests;
const stateConfigs = state => state.Components.BaseViewProps.configs;
const stateSearch = state => state.Components.BaseViewProps.q;
const stateTitleSearch = state => state.Components.BaseViewProps.titleQuery;
export const selectedTabSelector = (_, props) =>
  props.history.location.pathname;

const upcomingTestsSelector = createSelector(stateTests, tests =>
  tests.filter(t =>
    [TEST_STATUS.CONFIG, TEST_STATUS.APPROVED].includes(t.status)
  )
);
const liveTestsSelector = createSelector(stateTests, tests =>
  tests.filter(t => t.status === TEST_STATUS.ACTIVE)
);
const finishedTestSelector = createSelector(stateTests, tests =>
  tests.filter(t => t.status === TEST_STATUS.ANALYSIS)
);

const scheduledTestSelector = createSelector(
  upcomingTestsSelector,
  liveTestsSelector,
  finishedTestSelector,
  (upcomingTests, liveTests, finishedTests) => [
    ...upcomingTests,
    ...liveTests,
    ...finishedTests,
  ]
);

export const archivedTestsSelector = createSelector(stateTests, tests =>
  tests.filter(t => t.status === TEST_STATUS.ARCHIVED)
);

export const killedTestsSelector = createSelector(stateTests, tests =>
  tests.filter(t => t.status === TEST_STATUS.KILLED)
);

export const makeTitleTestsSelector = () =>
  createSelector(
    scheduledTestSelector,
    archivedTestsSelector,
    killedTestsSelector,
    selectedTabSelector,
    (scheduledTests, archivedTests, killedTests, selectedTab) => {
      if (selectedTab && selectedTab.includes('schedule')) {
        return Array.from(new Set(scheduledTests.map(test => test.title)));
      }
      if (selectedTab && selectedTab.includes('archive')) {
        return Array.from(new Set(archivedTests.map(test => test.title)));
      }
      if (selectedTab && selectedTab.includes('killed')) {
        return Array.from(new Set(killedTests.map(test => test.title)));
      }
      return null;
    }
  );

const testsWithConfigsSelector = createSelector(
  stateTests,
  stateConfigs,
  (tests, configs) =>
    tests.map(test => {
      const { configsID } = test;
      if (configsID) {
        const config = configs[`${test.titleID}:${test.environment}`];
        return {
          ...test,
          target: compact(
            configsID.map(configID =>
              get(find(config, { configID }), 'serviceID', false)
            )
          ).join('\n'),
        };
      }
      return test;
    })
);

export const makeGetTestsSelector = () =>
  createSelector(
    [testsWithConfigsSelector, stateSearch, stateTitleSearch],
    (tests, q, titleQuery) =>
      tests.filter(
        test =>
          ((q &&
            Object.values(test).some(value =>
              value
                .toString()
                .toLowerCase()
                .includes(q && q.toLowerCase())
            )) ||
            !q) &&
          ((titleQuery &&
            test.title.toLowerCase() === titleQuery.toLowerCase()) ||
            !titleQuery)
      )
  );
