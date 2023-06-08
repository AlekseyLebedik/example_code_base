import mockState from 'playpants/testUtils/mockState';
import reducer from '../reducer';
import * as AT from '../actionTypes';

const { GamertagManagement } = mockState.Scenes.ProjectSettings;

describe('Groups', () => {
  describe('groupsReducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      ...GamertagManagement,
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('FETCH_GROUPS', () => {
      it('initiates fetch for groups', () => {
        const action = {
          type: `${AT.FETCH_GROUPS}_FETCH`,
          urlID: null,
          params: {},
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_GROUPS_SUCCESS', () => {
      it('sets the groups with data', () => {
        const action = {
          type: `${AT.FETCH_GROUPS}_FETCH_SUCCESS`,
          data: [],
          next: null,
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_GROUPS_FAILED', () => {
      it('dispatches fetch error', () => {
        const action = {
          type: `${AT.FETCH_GROUPS}_FETCH_FAILED`,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
