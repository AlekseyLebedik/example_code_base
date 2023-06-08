import * as AP_AT from 'abtesting/components/ActionsPanel/actionTypes';
import { reducer } from '../reducer';
import * as AT from '../actionTypes';

describe('Update ABTest reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle FETCH_TEST_SUCCESS', () => {
    const data = {
      status: 'configuration',
      cohorts: [
        {
          cohortID: '9474364381302105764',
          source: {
            type: 'manual',
          },
          name: 'cht1',
          isControl: false,
          treatments: [
            {
              start: '1542027240',
              configs: ['15716207803415653925', '3269921500916109455'],
              end: '1542372840',
            },
          ],
        },
      ],
      updated: '1542100202',
      catchEnd: '1542113580',
      catchStart: '1542027180',
      assignmentSeed: '444b9a35f88a4a3e98d0a6a0f6086a33',
      creator: null,
      assignmentAlgorithm: 'sha256',
      purpose: null,
      created: '1542027391',
      comments: null,
      testID: '2826831981838830560',
      context: 'game2',
      data_scientist: null,
      stakeholders: [],
      organisation: null,
      categories: [],
      name: 'test4',
    };
    expect(
      reducer(undefined, { type: AT.FETCH_TEST_SUCCESS, test: data })
    ).toMatchSnapshot();
  });

  it('should handle RESET_TEST', () => {
    expect(reducer(undefined, { type: AT.RESET_TEST })).toMatchSnapshot();
  });

  it('should handle CHANGE_TEST_STATUS_SUCCESS', () => {
    const test = {
      status: 'configuration',
      cohorts: [
        {
          cohortID: '9474364381302105764',
          source: {
            type: 'manual',
          },
          name: 'cht1',
          isControl: false,
          treatments: [
            {
              start: '1542027240',
              configs: ['15716207803415653925', '3269921500916109455'],
              end: '1542372840',
            },
          ],
        },
      ],
      updated: '1542100202',
      catchEnd: '1542113580',
      catchStart: '1542027180',
      assignmentSeed: '444b9a35f88a4a3e98d0a6a0f6086a33',
      creator: null,
      assignmentAlgorithm: 'sha256',
      purpose: null,
      created: '1542027391',
      comments: null,
      testID: '2826831981838830560',
      context: 'game2',
      data_scientist: null,
      stakeholders: [],
      organisation: null,
      categories: [],
      name: 'test4',
    };
    expect(
      reducer(
        { test },
        {
          type: AP_AT.CHANGE_TEST_STATUS_SUCCESS,
          testID: '2826831981838830560',
          status: 'live',
        }
      )
    ).toMatchSnapshot();
  });
});
