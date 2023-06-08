import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('TournamentEngineSessionViewer', () => {
  const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      CriticalErrorActions.show.mockReset();
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
    });

    describe('fetchLobbies', () => {
      it('returns TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH action', () => {
        expect(actions.fetchLobbies({})).toMatchObject({
          type: AT.TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH,
        });
      });
    });

    describe('fetchLobbiesSuccess', () => {
      it('dispatches TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH_SUCCESS action', () => {
        expect(actions.fetchLobbiesSuccess({})).toMatchObject({
          type: AT.TOURNAMENT_SESSION_VIEWER_LOBBIES_FETCH_SUCCESS,
          data: {},
        });
      });
    });

    describe('fetchLobbiesFailed', () => {
      it('dispatches CriticalError show action', () => {
        const action = actions.fetchLobbiesFailed(Error(), {});
        expect(action).toAsyncDispatch({
          type: MOCKED_CRITICAL_ERROR,
        });
      });
    });
  });
});
