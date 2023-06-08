import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/uuid', () => ({
  uuid: () => '5cf3624e-5770-089e-a0e7-ebabadb26b96',
}));

describe('Update ABTest actions', () => {
  it('should create an action to fetch ABTest', () => {
    const [titleID, environment, id] = ['1', 'cert', '2826831981838830560'];
    const expectedAction = {
      type: AT.FETCH_TEST,
      titleID,
      environment,
      id,
    };
    expect(actions.fetchTest(titleID, environment, id)).toEqual(expectedAction);
  });

  it('should create an action to fetch ABTest success', () => {
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
    const expectedAction = {
      type: AT.FETCH_TEST_SUCCESS,
      test: data,
    };
    expect(actions.fetchTestSuccess(data)).toEqual(expectedAction);
  });

  it('dispatches SnackBar show error', () => {
    const err = { response: { data: { error: { msg: 'error' } } } };
    const action = actions.fetchTestFailed(err);
    expect(action).toAsyncDispatch({ type: AT.FETCH_TEST_FAILED });
    expect(action).toAsyncDispatch(
      GlobalSnackBarActions.show('error', 'error')
    );
  });

  it('should create an action to reset ABTest', () => {
    const expectedAction = {
      type: AT.RESET_TEST,
    };
    expect(actions.resetTest()).toEqual(expectedAction);
  });
});
