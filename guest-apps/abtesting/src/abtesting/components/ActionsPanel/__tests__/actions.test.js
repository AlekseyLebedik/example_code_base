import history from 'dw/core/helpers/history';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';

import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/helpers/history', () => ({
  push: jest.fn(),
}));

jest.mock('@demonware/devzone-core/helpers/uuid', () => ({
  uuid: () => '5cf3624e-5770-089e-a0e7-ebabadb26b96',
}));

describe('ActionsPanel Actions', () => {
  const dispatch = jest.fn();
  const testID = 1;
  beforeEach(() => {
    dispatch.mockReset();
  });

  it('changeTestStatus, fires action CHANGE_TEST_STATUS', () => {
    const action = actions.changeTestStatus(1, 'dev', testID, 'status');
    expect(action).toEqual({
      type: AT.CHANGE_TEST_STATUS,
      titleID: 1,
      envShortType: 'dev',
      testID,
      status: 'status',
    });
  });

  it('changeTestStatusSuccess, dispatches SnackBar show success and CHANGE_TEST_STATUS_SUCCESS', () => {
    const status = 'killed';
    actions.changeTestStatusSuccess(testID, status)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      GlobalSnackBarActions.show('Test status changed succesfully.', 'success')
    );
    expect(dispatch).toHaveBeenCalledWith({
      type: AT.CHANGE_TEST_STATUS_SUCCESS,
      testID,
      status,
    });
  });

  it('changeTestStatusFailed, dispatches SnackBar show error', () => {
    const err = { response: { data: { error: { msg: 'error' } } } };
    actions.changeTestStatusFailed(err)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      GlobalSnackBarActions.show('error', 'error')
    );
  });

  it('deleteTest, fires action DELETE_TEST', () => {
    const action = actions.deleteTest(1, 'dev', testID);
    expect(action).toEqual({
      type: AT.DELETE_TEST,
      titleID: 1,
      envShortType: 'dev',
      testID,
    });
  });

  it('deleteTestSuccess, dispatches SnackBar show success and DELETE_TEST_SUCCESS', () => {
    actions.deleteTestSuccess(testID)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      GlobalSnackBarActions.show('Test was successfully deleted.', 'success')
    );
    expect(history.push).toHaveBeenCalledWith('/abtesting/schedule');
    expect(dispatch).toHaveBeenCalledWith({
      type: AT.DELETE_TEST_SUCCESS,
      testID,
    });
  });

  it('deleteTestFailed, dispatches SnackBar show error', () => {
    const err = { response: { data: { error: { msg: 'error' } } } };
    actions.deleteTestFailed(err)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(
      GlobalSnackBarActions.show('error', 'error')
    );
  });
});
