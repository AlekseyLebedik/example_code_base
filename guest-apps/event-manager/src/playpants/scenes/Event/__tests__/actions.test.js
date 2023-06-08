import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import mockState from 'playpants/testUtils/mockState';
import * as actions from '../actions';
import * as AT from '../actionTypes';

const { discussion } = mockState.Scenes.Event;

jest.mock('@demonware/devzone-core/helpers/errors');

describe('Activity', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  beforeEach(() => {
    nonCriticalHTTPError.mockReset();
    nonCriticalHTTPError.mockReturnValue({
      type: MOCKED_NON_CRITICAL_ERROR,
    });
  });

  describe('fetchEvent', () => {
    it('fetch event', () => {
      expect(actions.fetchEvent(1)).toMatchObject({
        type: `${AT.EVENT_FETCH}_FETCH`,
        urlID: 1,
      });
    });
  });

  describe('fetchDiscussion', () => {
    it('fetch discussion', () => {
      expect(actions.fetchDiscussion(1)).toMatchObject({
        type: `${AT.DISCUSSION_FETCH}_FETCH`,
        urlID: 1,
      });
    });
  });

  describe('editEvent', () => {
    it('edits a event', () => {
      expect(actions.editEvent(1, {})).toMatchObject({
        type: `${AT.UPDATE_EVENT}_UPDATE`,
        urlID: 1,
      });
    });
  });

  describe('editAuth', () => {
    it('edits auth', () => {
      expect(actions.editAuths(1, {})).toMatchObject({
        type: `${AT.UPDATE_AUTHS}_UPDATE`,
        urlID: 1,
      });
    });
  });

  describe('deleteEvent', () => {
    it('delete event', () => {
      expect(actions.deleteEvent(1)).toMatchObject({
        type: `${AT.DELETE_EVENT}_UPDATE`,
        urlID: 1,
      });
    });
  });

  const testComment = discussion[0];
  describe('createComment', () => {
    it('adds a comment to the discussion', () => {
      expect(actions.createComment(3, testComment)).toMatchObject({
        type: `${AT.CREATE_COMMENT}_UPDATE`,
        urlID: 3,
      });
    });
  });
});
