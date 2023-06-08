import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('ServerInventory', () => {
  const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      CriticalErrorActions.show.mockReset();
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
    });

    describe('fetchServersAllocation', () => {
      it('returns SERVERS_ALLOC_FETCH action', () => {
        expect(actions.fetchServersAllocation({})).toMatchObject({
          type: AT.SERVERS_ALLOC_FETCH,
        });
      });
    });

    describe('fetchServersAllocationSuccess', () => {
      it('dispatches SERVERS_ALLOC_FETCH_SUCCESS action', () => {
        expect(actions.fetchServersAllocationSuccess(['test'])).toMatchObject({
          type: AT.SERVERS_ALLOC_FETCH_SUCCESS,
          data: ['test'],
        });
      });
    });

    describe('fetchServersAllocationFailed', () => {
      it('dispatches CriticalError show action', () => {
        const action = actions.fetchServersAllocationFailed(Error(), {}, true);
        expect(action).toAsyncDispatch({
          type: MOCKED_CRITICAL_ERROR,
        });
      });
    });
  });
});
