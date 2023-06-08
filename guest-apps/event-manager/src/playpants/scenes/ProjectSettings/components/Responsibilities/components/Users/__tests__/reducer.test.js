import mockState from 'playpants/testUtils/mockState';
import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('Users', () => {
  describe('userList reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      ...mockState.Scenes.ProjectSettings.Responsibilities.user,
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('FETCH_ASSIGNED_GROUPS', () => {
      it('initiates fetch for users', () => {
        const action = {
          type: `${AT.FETCH_ASSIGNED_GROUPS}_FETCH`,
          urlID: null,
          params: { sort: 'name' },
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_ASSIGNED_GROUPS_SUCCESS', () => {
      it('sets the available user with data', () => {
        const action = {
          type: `${AT.FETCH_ASSIGNED_GROUPS}_FETCH_SUCCESS`,
          data: [],
          next: null,
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_ASSIGNED_GROUPS_FAILED', () => {
      it('dispatches fetch error', () => {
        const action = {
          type: `${AT.FETCH_ASSIGNED_GROUPS}_FETCH_FAILED`,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
