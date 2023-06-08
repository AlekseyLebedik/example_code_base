import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/ModalHandlers');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

const functionId = 1;
const functionIds = [functionId];
const data = [
  {
    functionId,
    argumentNames: ['id', 'name', 'order'],
    functionName: 'listFilesByOwners',
  },
  {
    functionId: 2,
    argumentNames: ['id'],
    functionName: 'getFilesFromContext',
  },
];
const values = {
  functionId: '3',
  functionName: 'blah',
};
const err = 'error';

describe('Security - Anticheat - Functions', () => {
  describe('Action Creators', () => {
    const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
    const MOCKED_GLOBAL_SNACK_BAR = 'MOCKED_GLOBAL_SNACK_BAR_SHOW';
    const MOCKED_MODAL_HANDLERS_CLOSE = 'MOCKED_MODAL_HANDLERS_CLOSE';
    const MOCKED_MODAL_HANDLERS_SUBMIT = 'MOCKED_MODAL_HANDLERS_SUBMIT';
    const MOCKED_MODAL_HANDLERS_STOP_SUBMITTING =
      'MOCKED_MODAL_HANDLERS_STOP_SUBMITTING';

    beforeAll(() => {
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      GlobalSnackBarActions.show.mockReturnValue({
        type: MOCKED_GLOBAL_SNACK_BAR,
      });
      ModalHandlers.close.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_CLOSE,
      });
      ModalHandlers.submit.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_SUBMIT,
      });
      ModalHandlers.stopSubmitting.mockReturnValue({
        type: MOCKED_MODAL_HANDLERS_STOP_SUBMITTING,
      });
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('FUNCTIONS_FETCH', () => {
      expect(actions.fetchFunctions()).toHaveProperty(
        'type',
        AT.FUNCTIONS_FETCH
      );
    });

    it('FUNCTIONS_FETCH_SUCCESS', () => {
      const action = actions.fetchFunctionsSuccess({ data });

      expect(action).toHaveProperty('type', AT.FUNCTIONS_FETCH_SUCCESS);
      expect(action).toHaveProperty('functions', data);
    });

    it('fetchFunctionsFailed', () => {
      const action = actions.fetchFunctionsFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_CRITICAL_ERROR });
    });

    it('FUNCTION_ADD', () => {
      const action = actions.addFunction(values);

      expect(action).toAsyncDispatch({ type: AT.FUNCTION_ADD, values });
      expect(action).toAsyncDispatch({ type: MOCKED_MODAL_HANDLERS_SUBMIT });
    });

    it('addFunctionSuccess', () => {
      const action = actions.addFunctionSuccess();

      expect(action).toAsyncDispatch({ type: MOCKED_MODAL_HANDLERS_CLOSE });
      expect(action).toAsyncDispatch({ type: MOCKED_GLOBAL_SNACK_BAR });
      expect(action).toAsyncDispatch({ type: AT.FUNCTIONS_FETCH });
    });

    it('addFunctionFailed', () => {
      const action = actions.addFunctionFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
      expect(action).toAsyncDispatch({ type: AT.FUNCTION_ADD_FAILED });
      expect(action).toAsyncDispatch({
        type: MOCKED_MODAL_HANDLERS_STOP_SUBMITTING,
      });
    });

    it('FUNCTION_DELETE', () => {
      const action = actions.deleteFunction(functionIds);

      expect(action).toAsyncDispatch({ type: AT.FUNCTION_DELETE, functionIds });
      expect(action).toAsyncDispatch({ type: MOCKED_GLOBAL_SNACK_BAR });
    });

    it('deleteFunctionSuccess', () => {
      const action = actions.deleteFunctionSuccess(functionIds);

      expect(action).toAsyncDispatch({
        type: AT.FUNCTION_DELETE_SUCCESS,
        functionIds,
      });
    });

    it('deleteFunctionFailed', () => {
      const action = actions.deleteFunctionFailed(err);

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle FUNCTIONS_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, actions.fetchFunctionsSuccess({ data }))
      ).toMatchSnapshot();
    });

    it('handle FUNCTION_DELETE_SUCCESS', () => {
      const state = reducer(undefined, actions.fetchFunctionsSuccess({ data }));
      expect(
        reducer(state, { type: AT.FUNCTION_DELETE_SUCCESS, functionIds })
      ).toMatchSnapshot();
    });
  });
});
