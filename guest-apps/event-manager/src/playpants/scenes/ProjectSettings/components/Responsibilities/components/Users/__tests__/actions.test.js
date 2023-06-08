import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('ProjectSettings', () => {
  describe('Actions', () => {
    describe('fetchAssignedGroups', () => {
      it('returns FETCH_ASSIGNED_GROUPS action', () => {
        expect(actions.fetchAssignedGroups()).toMatchObject({
          type: `${AT.FETCH_ASSIGNED_GROUPS}_FETCH`,
          append: false,
          params: {},
          urlID: null,
        });
      });
    });

    describe('addUserToGroup', () => {
      const groups = [{ id: 1 }, { id: 2 }];
      it('returns ADD_USER action', () => {
        expect(actions.addUserToGroup(1, { groups }, 1)).toMatchObject({
          type: `${AT.ADD_USER}`,
          userID: 1,
          groups,
          project: 1,
        });
      });
    });
  });
});
