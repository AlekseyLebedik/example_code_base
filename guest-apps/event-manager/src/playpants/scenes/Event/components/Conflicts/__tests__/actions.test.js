import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as conflictsActions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('ConflictDetailsPresentational', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  beforeEach(() => {
    nonCriticalHTTPError.mockReset();
    nonCriticalHTTPError.mockReturnValue({
      type: MOCKED_NON_CRITICAL_ERROR,
    });
  });

  describe('fetchConflicts', () => {
    it('fetch conflicts for a given event ID', () => {
      expect(conflictsActions.fetchConflicts(1)).toMatchObject({
        type: `${AT.FETCH_CONFLICTS}_FETCH`,
        urlID: 1,
      });
    });
  });

  describe('searchConflicts', () => {
    it('searched through conflicts with a given query', () => {
      expect(conflictsActions.searchConflicts('test')).toMatchObject({
        type: AT.SEARCH_CONFLICTS,
        query: 'test',
      });
    });
  });

  describe('setConflictType', () => {
    it('sets the conflict type', () => {
      expect(conflictsActions.setConflictType('all')).toMatchObject({
        type: AT.SET_CONFLICT_TYPE,
        conflictType: 'all',
      });
    });
  });
});
