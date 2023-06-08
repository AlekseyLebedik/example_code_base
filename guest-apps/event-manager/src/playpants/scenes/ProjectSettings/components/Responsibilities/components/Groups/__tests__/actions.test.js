import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('Responsibility groups', () => {
  describe('Actions', () => {
    describe('fetchGroupMembers', () => {
      it('returns FETCH_GROUP_MEMBERS action', () => {
        expect(actions.fetchGroupMembers(1)).toMatchObject({
          type: `${AT.FETCH_GROUP_MEMBERS}_FETCH`,
          append: false,
          urlID: 1,
        });
      });
    });

    describe('updateGroupMembers', () => {
      it('returns UPDATE_GROUP_MEMBERS action', () => {
        expect(actions.updateGroupMembers({})).toMatchObject({
          type: `${AT.UPDATE_GROUP_MEMBERS}_UPDATE`,
          params: undefined,
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
