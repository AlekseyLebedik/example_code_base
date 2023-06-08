import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

const revisionId = 1;
const data = [
  {
    change: 'Added writable leaderoards: [2, 3]',
    revision: revisionId,
  },
  {
    change: 'Added writable leaderoards: [4, 5]',
    revision: 2,
  },
];

describe('Security - ACL - Revision History', () => {
  describe('Action Creators', () => {
    const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
    const MOCKED_GLOBAL_SNACK_BAR = 'MOCKED_GLOBAL_SNACK_BAR_SHOW';

    beforeAll(() => {
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      GlobalSnackBarActions.show.mockReturnValue({
        type: MOCKED_GLOBAL_SNACK_BAR,
      });
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('REVISION_HISTORY_FETCH', () => {
      expect(actions.fetchRevisions()).toHaveProperty(
        'type',
        AT.REVISION_HISTORY_FETCH
      );
    });

    it('REVISION_HISTORY_FETCH_SUCCESS', () => {
      const action = actions.fetchRevisionsSuccess({ data });

      expect(action).toHaveProperty('type', AT.REVISION_HISTORY_FETCH_SUCCESS);
      expect(action).toHaveProperty('revisions', data);
    });

    it('fetchRevisionsFailed', () => {
      const action = actions.fetchRevisionsFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_CRITICAL_ERROR });
    });

    it('REVISION_HISTORY_REVERT', () => {
      const action = actions.revertRevision(revisionId);

      expect(action).toHaveProperty('type', AT.REVISION_HISTORY_REVERT);
      expect(action).toHaveProperty('revisionId', revisionId);
    });

    it('REVISION_HISTORY_REVERT_SUCCESS', () => {
      const action = actions.revertRevisionSuccess(revisionId);

      expect(action).toAsyncDispatch(
        { type: AT.REVISION_HISTORY_REVERT_SUCCESS, revisionId },
        { type: MOCKED_GLOBAL_SNACK_BAR }
      );
    });

    it('revertRevisionFailed', () => {
      const action = actions.revertRevisionFailed();

      expect(action).toAsyncDispatch({ type: MOCKED_NON_CRITICAL_ERROR });
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle REVISION_HISTORY_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, actions.fetchRevisionsSuccess({ data }))
      ).toMatchSnapshot();
    });

    it('handle REVISION_HISTORY_REVERT_SUCCESS', () => {
      const state = reducer(undefined, actions.fetchRevisionsSuccess({ data }));
      expect(
        reducer(state, { type: AT.REVISION_HISTORY_REVERT_SUCCESS, revisionId })
      ).toMatchSnapshot();
    });
  });
});
