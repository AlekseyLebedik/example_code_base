import { reducer } from '../reducer';
import * as AT from '../actionTypes';
import { FETCH_ALL_TESTS_PREFIX } from '../constants';
import * as AP_AT from '../../ActionsPanel/actionTypes';

const tests = [
  {
    category: 'Other',
    environment: 'dev',
    id: 1,
    platform: 'PS3',
    project: {
      contentTypeId: 17,
      id: 1,
      name: 'GTR Project',
    },
    source: 'manual',
    status: 'config',
    target: 'ae',
    name: 'Test 1',
    testPeriodFrom: 1535454075,
    testPeriodTo: 1535455085,
    title: 'GTR-PS3',
    first_parties: ['nintendo', 'battlenet'],
    titleID: 1,
    cohorts: [
      {
        treatments: [
          {
            start: 12452020,
            end: 12502020,
            configs: [
              {
                serviceID: 123,
              },
            ],
          },
        ],
        source: {
          type: 'foo',
        },
      },
    ],
    categories: ['foo', 'bar'],
  },
  {
    category: 'Other',
    environment: 'cert',
    id: 2,
    platform: 'PS3',
    project: {
      contentTypeId: 17,
      id: 1,
      name: 'GTR Project',
    },
    source: 'manual',
    status: 'config',
    target: 'mkt',
    name: 'Test 2',
    testPeriodFrom: 1535454075,
    testPeriodTo: 1535455085,
    title: 'GTR-PS3',
    titleID: 1,
    cohorts: [
      {
        treatments: [
          {
            start: 12452020,
            end: 12502020,
            configs: [
              {
                serviceID: 123,
              },
            ],
          },
        ],
        source: {
          type: 'foo',
        },
      },
    ],
    categories: ['foo', 'bar'],
  },
];

describe('BaseViewProps', () => {
  describe('Reducer', () => {
    const initialState = reducer(undefined, {});

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('GLOBAL_SEARCH', () => {
      it('returns state with search', () => {
        const action = {
          type: AT.GLOBAL_SEARCH,
          q: 'test',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_ALL_TESTS_PREFIX_FETCH_SUCCESS', () => {
      it('returns state with search', () => {
        const action = {
          type: `${FETCH_ALL_TESTS_PREFIX}_FETCH_SUCCESS`,
          data: tests,
        };
        const state = reducer(
          {
            tests,
          },
          action
        );
        expect(state).toMatchSnapshot();
      });
    });

    describe('DELETE_TEST_SUCCESS', () => {
      it('returns state without deleted tests', () => {
        const testID = 1;
        const action = {
          type: AP_AT.DELETE_TEST_SUCCESS,
          testID,
        };
        const state = reducer(
          {
            tests: [
              {
                category: 'Other',
                environment: 'dev',
                id: 1,
                platform: 'PS3',
                project: {
                  contentTypeId: 17,
                  id: 1,
                  name: 'GTR Project',
                },
                source: 'manual',
                status: 'config',
                target: 'ae',
                name: 'Test 1',
                testPeriodFrom: 1535454075,
                testPeriodTo: 1535455085,
                title: 'GTR-PS3',
                titleID: 1,
              },
              {
                category: 'Other',
                environment: 'cert',
                id: 2,
                platform: 'PS3',
                project: {
                  contentTypeId: 17,
                  id: 1,
                  name: 'GTR Project',
                },
                source: 'manual',
                status: 'config',
                target: 'mkt',
                name: 'Test 2',
                testPeriodFrom: 1535454075,
                testPeriodTo: 1535455085,
                title: 'GTR-PS3',
                titleID: 1,
              },
            ],
          },
          action
        );
        expect(state).toMatchSnapshot();
      });
    });
  });
});
