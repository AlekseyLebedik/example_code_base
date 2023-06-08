import { getReducer } from '../reducer';
import * as actions from '../actions';

const actionPrefix = 'TAB_BLAH';
const urlID = '1234567890';
const data = [
  {
    membershipType: '0',
    numMembersOnline: '0',
    numTeamMembers: '9',
    ownerUserID: '33853876575912758',
    privileges: '0',
    teamID: '6',
    teamName: 'dream-team-6',
  },
];
const nextPageToken = 'CAE';
const payload = {
  nextPageToken,
  data,
  context: 'game_context',
};
const fetchAction = actions.fetch(actionPrefix, urlID, {}, false);
const fetchSuccessAction = actions.fetchSuccess(
  actionPrefix,
  payload,
  true,
  'data'
);

describe('TabWithTable', () => {
  describe('Action Creators', () => {
    it('TAB_BLAH_FETCH', () => {
      expect(fetchAction).toHaveProperty('type', `${actionPrefix}_FETCH`);
      expect(fetchAction).toHaveProperty('urlID', urlID);
    });

    it('TAB_BLAH_FETCH_SUCCESS', () => {
      expect(fetchSuccessAction).toHaveProperty(
        'type',
        `${actionPrefix}_FETCH_SUCCESS`
      );
      expect(fetchSuccessAction).toHaveProperty('collection', data);
      expect(fetchSuccessAction).toHaveProperty('nextPageToken', nextPageToken);
      expect(fetchSuccessAction).toHaveProperty('append', true);
    });
  });

  describe('Reducer', () => {
    it('returns initial state', () => {
      expect(getReducer(undefined)(undefined, {})).toMatchSnapshot();
    });

    it('handles FETCH', () => {
      expect(
        getReducer(actionPrefix)(undefined, fetchAction)
      ).toMatchSnapshot();
    });

    it('handles FETCH_SUCCESS', () => {
      expect(
        getReducer(actionPrefix)(undefined, fetchSuccessAction)
      ).toMatchSnapshot();
    });
  });
});
