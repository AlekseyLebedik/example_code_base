import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import reducer from '../reducer';

const nextPageToken = 'CAE';
const log = {
  challengeId: '9896421084564179338',
  connectionId: '11524973186985937416',
  logMessage: 'log message (6812715122805060947)',
  response: '9223372036854775807',
  userId: '9666065021272857122',
  timestamp: 1529867269,
  logId: '18293345908526280196',
  responseStatus: 'correct',
  punished: 1,
  monitoredGroup: 'custom_7',
  monitoredGroupId: 9,
  userName: 'HostUser',
};
const data = [log];

describe('Security - Anticheat - ChallengeLogs', () => {
  describe('Action Creators', () => {
    it('SECURITY_CHALLENGE_LOGS_FETCH', () => {
      const action = actions.fetchChallengeLogs({ nextPageToken });
      expect(action).toHaveProperty('type', AT.SECURITY_CHALLENGE_LOGS_FETCH);
      expect(action).toHaveProperty('params', { nextPageToken });
      expect(action).toHaveProperty('append', false);
    });

    it('SECURITY_CHALLENGE_LOGS_FETCH_SUCCESS', () => {
      const action = actions.fetchChallengeLogsSuccess(
        { data, nextPageToken },
        true
      );
      expect(action).toHaveProperty(
        'type',
        AT.SECURITY_CHALLENGE_LOGS_FETCH_SUCCESS
      );
      expect(action).toHaveProperty('challengeLogs', data);
      expect(action).toHaveProperty('nextPageToken', nextPageToken);
      expect(action).toHaveProperty('append', true);
    });

    it('fetchChallengeLogsFailed', () => {
      const dispatch = jest.fn();
      const criticalErrorShowMock = jest.fn();
      CriticalErrorActions.show = criticalErrorShowMock;
      actions.fetchChallengeLogsFailed()(dispatch);

      expect(criticalErrorShowMock).toHaveBeenCalled();
    });

    it('SECURITY_CHALLENGE_LOGS_LIST_ITEM_ONCLICK', () => {
      const action = actions.challengeLogsListItemClick(log);
      expect(action).toHaveProperty(
        'type',
        AT.SECURITY_CHALLENGE_LOGS_LIST_ITEM_ONCLICK
      );
      expect(action).toHaveProperty('log', log);
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle SECURITY_CHALLENGE_LOGS_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(undefined, actions.fetchChallengeLogsSuccess({ data: [] }))
      ).toMatchSnapshot();
    });

    it('handle SECURITY_CHALLENGE_LOGS_FETCH_SUCCESS: challengeLogs and nextPagetoken assignation', () => {
      expect(
        reducer(
          undefined,
          actions.fetchChallengeLogsSuccess({ data, nextPageToken })
        )
      ).toMatchSnapshot();
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { challengeLogs: [1, 2] },
          actions.fetchChallengeLogsSuccess(
            { data: [3, 4], nextPageToken },
            false
          )
        )
      ).toMatchSnapshot();
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { challengeLogs: [1, 2] },
          actions.fetchChallengeLogsSuccess(
            { data: [3, 4], nextPageToken },
            true
          )
        )
      ).toMatchSnapshot();
    });

    it('handle SECURITY_CHALLENGE_LOGS_LIST_ITEM_ONCLICK', () => {
      expect(
        reducer(undefined, actions.challengeLogsListItemClick(log))
      ).toMatchSnapshot();
    });
  });
});
