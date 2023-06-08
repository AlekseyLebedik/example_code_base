import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('VariableSets', () => {
  describe('Actions', () => {
    const item = { namespace: '1', groupId: 2, context: '3' };

    const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

    beforeEach(() => {
      CriticalErrorActions.show.mockReset();
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchVariablesSets', () => {
      it('dipatches a STORAGE_VARIABLES_SETS_FETCH action', () => {
        expect(actions.fetchVariablesSets({})).toEqual({
          type: AT.STORAGE_VARIABLES_SETS_FETCH,
          append: false,
          params: {},
        });
      });
    });

    describe('fetchVariablesSetsSuccess', () => {
      it('dipatches a STORAGE_VARIABLES_SETS_FETCH_SUCCESS action', () => {
        expect(
          actions.fetchVariablesSetsSuccess(
            { data: [], nextPageToken: 'ABC' },
            true
          )
        ).toEqual({
          type: AT.STORAGE_VARIABLES_SETS_FETCH_SUCCESS,
          nextPageToken: 'ABC',
          append: true,
          entries: [],
          q: undefined,
        });
      });
    });

    describe('fetchVariablesSetsFailed', () => {
      it('dipatches a Non-Critical Error action', () => {
        expect(actions.fetchVariablesSetsFailed(Error())).toAsyncDispatch(
          { type: MOCKED_CRITICAL_ERROR },
          { err: Error(), type: AT.STORAGE_VARIABLES_SETS_FETCH_FAILED }
        );
      });
    });

    describe('variablesSetsListItemClick', () => {
      it('dipatches STORAGE_VARIABLES_SETS_LIST_ITEM_ONCLICK and STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS actions', () => {
        expect(actions.variablesSetsListItemClick({})).toAsyncDispatch(
          { type: AT.STORAGE_VARIABLES_SETS_LIST_ITEM_ONCLICK },
          { type: AT.STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS }
        );
      });
    });

    describe('openAddModal', () => {
      it('dipatches a STORAGE_VARIABLES_SETS_OPEN_ADD_MODAL action', () => {
        expect(actions.openAddModal()).toEqual({
          type: AT.STORAGE_VARIABLES_SETS_OPEN_ADD_MODAL,
        });
      });
    });

    describe('closeAddModal', () => {
      it('dipatches a STORAGE_VARIABLES_SETS_CLOSE_ADD_MODAL action', () => {
        expect(actions.closeAddModal()).toEqual({
          type: AT.STORAGE_VARIABLES_SETS_CLOSE_ADD_MODAL,
        });
      });
    });

    describe('addVariablesSets', () => {
      it('dipatches a STORAGE_VARIABLES_SETS_ADD action', () => {
        const values = { variables: [] };
        const resolve = jest.fn();
        const reject = jest.fn();

        expect(actions.addVariablesSets(values, resolve, reject)).toEqual({
          type: AT.STORAGE_VARIABLES_SETS_ADD,
          values,
          resolve,
          reject,
        });
      });
    });

    describe('addVariablesSetSuccess', () => {
      it('dipatches a STORAGE_VARIABLES_SETS_ADD_SUCCESS action', () => {
        expect(actions.addVariablesSetSuccess(item)).toAsyncDispatch({
          type: AT.STORAGE_VARIABLES_SETS_ADD_SUCCESS,
          listItem: expect.objectContaining({
            groupId: '2',
            variableSetId: '1,2,3',
          }),
        });
      });
    });

    describe('addVariablesSetFailed', () => {
      it('dipatches a Non Critical Error action', () => {
        expect(actions.addVariablesSetFailed(Error())).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('deleteVariablesSet', () => {
      it('dipatches a STORAGE_VARIABLES_SET_DELETE action', () => {
        expect(actions.deleteVariablesSet('1,2,3')).toEqual({
          type: AT.STORAGE_VARIABLES_SET_DELETE,
          variableSetId: '1,2,3',
        });
      });
    });

    describe('deleteVariablesSetSuccess', () => {
      it('dipatches a STORAGE_VARIABLES_SET_DELETE_SUCCESS action', () => {
        expect(actions.deleteVariablesSetSuccess('1,2,3')).toAsyncDispatch({
          type: AT.STORAGE_VARIABLES_SET_DELETE_SUCCESS,
          variableSetId: '1,2,3',
        });
      });
    });

    describe('deleteVariablesSetFailed', () => {
      it('dipatches a Non Critical Error action', () => {
        expect(actions.deleteVariablesSetFailed(Error())).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('fetchVariablesSetDetailsSuccess', () => {
      it('dipatches a STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS_SUCCESS action', () => {
        expect(
          actions.fetchVariablesSetDetailsSuccess('1,2,3', { data: 'data' })
        ).toEqual({
          type: AT.STORAGE_VARIABLES_SETS_FETCH_VARIABLES_SETS_DETAILS_SUCCESS,
          data: 'data',
          variableSetId: '1,2,3',
        });
      });
    });

    describe('fetchVariablesSetDetailsFailed', () => {
      it('dipatches a Non Critical Error action', () => {
        expect(actions.fetchVariablesSetDetailsFailed({})).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('updateVariablesSet', () => {
      it('dipatches a STORAGE_VARIABLES_SET_UPDATE action', () => {
        expect(actions.updateVariablesSet('1,2,3', { variables: [] })).toEqual({
          type: AT.STORAGE_VARIABLES_SET_UPDATE,
          variableSetId: '1,2,3',
          variableSet: { variables: [] },
        });
      });
    });

    // Due to Jest version, is not possible to test this in the
    // same way we test other cases
    describe.skip('updateVariablesSetSuccess', () => {
      it('dipatches a STORAGE_VARIABLES_SETS_FETCH_SUCCESS action', () => {
        expect(actions.updateVariablesSetSuccess({})).toAsyncDispatch({
          type: AT.STORAGE_VARIABLES_SETS_FETCH_SUCCESS,
        });
      });
    });

    describe('updateVariablesSetFailed', () => {
      it('dipatches a Non Critical Error action', () => {
        expect(actions.updateVariablesSetFailed(Error())).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });

    describe('propagateVariablesSet', () => {
      it('dipatches a STORAGE_VARIABLES_SET_PROPAGATE action', () => {
        const values = {
          context: '1',
          environment: { key: '1:live', label: '(1) GTR-PS3 PS3 live' },
          variables: { blah: '1', blah2: '' },
          groupId: 2,
          namespace: 'general',
        };
        const resolve = jest.fn();
        const reject = jest.fn();

        expect(actions.propagateVariablesSet(values, resolve, reject)).toEqual({
          type: AT.STORAGE_VARIABLES_SET_PROPAGATE,
          values: {
            ...values,
            variables: [
              { key: 'blah', value: '1' },
              { key: 'blah2', value: '' },
            ],
          },
          resolve,
          reject,
        });
      });
    });
  });
});
