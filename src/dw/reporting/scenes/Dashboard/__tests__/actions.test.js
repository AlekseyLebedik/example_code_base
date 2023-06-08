import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('Reporting Dashboard', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('Fetch Franchise data', () => {
      it('returns an FETCH_FRANCHISE_DATA action', () => {
        expect(actions.fetchFranchiseData(1)).toMatchObject({
          type: AT.FETCH_FRANCHISE_DATA,
        });
      });
    });

    describe('fetchFranchiseDataSuccess', () => {
      it('returns an FETCH_FRANCHISE_DATA_SUCCESS action for all services of a given environment', () => {
        const action = actions.fetchFranchiseDataSuccess({
          id: 1,
          data: 'test',
          statName: 'statName',
        });

        expect(action).toMatchObject({
          type: AT.FETCH_FRANCHISE_DATA_SUCCESS,
        });
      });
    });
  });
});
