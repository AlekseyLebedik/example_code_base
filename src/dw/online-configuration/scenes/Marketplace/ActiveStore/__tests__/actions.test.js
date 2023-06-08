import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { Services } from 'dw/online-configuration/constants';
import {
  mockState,
  DEFAULT_TITLE_CONTEXT,
} from 'dw/core/components/ContextSelector/test-utils';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('ActiveStore', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchActiveStore', () => {
      it('dispatches ACTIVE_STORE_FETCH action', () => {
        const dispatch = jest.fn();
        const getState = () =>
          mockState({ serviceNames: Services.Marketplace });
        actions.fetchActiveStore()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
          type: AT.ACTIVE_STORE_FETCH,
          context: DEFAULT_TITLE_CONTEXT,
        });
      });
    });

    describe('fetchActiveStoreSuccess', () => {
      it('returns ACTIVE_STORE_FETCH_SUCCESS action', () => {
        expect(actions.fetchActiveStoreSuccess({})).toMatchObject({
          type: AT.ACTIVE_STORE_FETCH_SUCCESS,
        });
      });
    });

    describe('fetchActiveStoreFailed', () => {
      it('dispatches CriticalError show action', () => {
        const action = actions.fetchActiveStoreFailed(Error());
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
