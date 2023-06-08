import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('Graphs', () => {
  const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
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

    describe('fetchEvents', () => {
      it('returns EVENTS_FETCH action', () => {
        expect(actions.fetchEvents()).toMatchObject({
          type: AT.EVENTS_FETCH,
        });
      });
    });

    describe('fetchEventsSuccess', () => {
      it('returns EVENTS_FETCH_SUCCESS action', () => {
        expect(actions.fetchEventsSuccess({})).toMatchObject({
          type: AT.EVENTS_FETCH_SUCCESS,
          payload: {},
        });
      });
    });
  });
});
