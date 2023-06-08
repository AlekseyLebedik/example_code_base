import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('Gamertag groups', () => {
  describe('Actions', () => {
    describe('fetchGroups', () => {
      it('returns FETCH_GROUPS action', () => {
        expect(actions.fetchGroups()).toMatchObject({
          type: `${AT.FETCH_GROUPS}_FETCH`,
          append: false,
          params: {},
          urlID: null,
        });
      });
    });

    describe('fetchGroupAccounts', () => {
      it('returns FETCH_GROUP_ACCOUNTS action', () => {
        expect(actions.fetchGroupAccounts(1)).toMatchObject({
          type: `${AT.FETCH_GROUP_ACCOUNTS}_FETCH`,
          append: false,
          urlID: 1,
        });
      });
    });

    describe('updateGroupAccounts', () => {
      it('returns UPDATE_GROUP_ACCOUNTS action', () => {
        expect(actions.updateGroupAccounts({})).toMatchObject({
          type: `${AT.UPDATE_GROUP_ACCOUNTS}_UPDATE`,
          params: {},
        });
      });
    });

    describe('createGroup', () => {
      it('returns CREATE_GROUP action', () => {
        expect(actions.createGroup({})).toMatchObject({
          type: AT.CREATE_GROUP,
          group: {},
        });
      });
    });
  });
});
