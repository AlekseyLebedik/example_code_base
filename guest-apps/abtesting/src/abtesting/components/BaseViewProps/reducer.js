import flattenDeep from 'lodash/flattenDeep';
import uniq from 'lodash/uniq';
import unionBy from 'lodash/unionBy';
import {
  testStartSelector,
  testEndSelector,
  determineTestStatus,
} from 'dw/abtesting-utils';
import { getFirstPartiesFromTest } from 'abtesting/helpers';

import * as AT from './actionTypes';
import * as AP_AT from '../ActionsPanel/actionTypes';

import { FETCH_ALL_TESTS_PREFIX } from './constants';

const INITIAL_STATE = {
  tests: [],
  q: undefined,
  titleQuery: undefined,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.GLOBAL_SEARCH:
      return {
        ...state,
        q: action.q,
      };
    case AT.TITLE_SEARCH:
      return {
        ...state,
        titleQuery: action.titleQuery,
      };
    case `${FETCH_ALL_TESTS_PREFIX}_FETCH_SUCCESS`: {
      const { data } = action;
      const tests = data.map(test => {
        const start = testStartSelector(test);
        const end = testEndSelector(test);
        const newStatus = determineTestStatus(test, start, end);
        const platform = getFirstPartiesFromTest(test) || test.platform;
        return {
          id: test.testID,
          name: test.name,
          title: test.title,
          titleID: test.titleID,
          platform,
          environment: test.environment,
          source: test.cohorts.map(cohorts => cohorts.source.type).join('\n'),
          target: uniq(
            flattenDeep(
              test.cohorts.map(cohort =>
                cohort.treatments.map(treatment =>
                  treatment.configs.map(config => config.serviceID)
                )
              )
            )
          ).join('\n'),
          category: test.categories.map(category => category).join('\n'),
          testPeriodFrom: test.catchStart,
          testPeriodTo: test.catchEnd,
          status: newStatus,
          testPeriodStart: start,
          testPeriodEnd: end,
          project: test.project,
        };
      });

      return {
        ...state,
        tests: unionBy(tests, state.tests, 'id'),
      };
    }
    case AP_AT.CHANGE_TEST_STATUS_SUCCESS: {
      // it's worked so we will now display the status that should be on the test serverside
      const newState = {
        ...state,
        tests: state.tests.map(t => {
          if (t.id === action.testID) {
            const tempTest = { ...t, status: action.status };
            // but first we should check if that new status affects Devzone's view of the test
            tempTest.status = determineTestStatus(tempTest);
            return tempTest;
          }
          return t;
        }),
      };
      return newState;
    }
    case AP_AT.DELETE_TEST_SUCCESS:
      return {
        ...state,
        tests: state.tests.filter(t => t.id !== action.testID),
      };
    default:
      return state;
  }
};
