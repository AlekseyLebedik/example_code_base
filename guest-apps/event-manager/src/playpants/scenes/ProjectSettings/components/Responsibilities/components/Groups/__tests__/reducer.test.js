import mockState from 'playpants/testUtils/mockState';
import reducer from '../reducer';
import * as AT from '../actionTypes';

const { group } = mockState.Scenes.ProjectSettings.Responsibilities;

describe('Groups', () => {
  describe('membersReducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      ...group,
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('FETCH_GROUP_MEMBERS', () => {
      it('initiates fetch for group members', () => {
        const action = {
          type: `${AT.FETCH_GROUP_MEMBERS}_FETCH`,
          urlID: null,
          params: {},
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_GROUP_MEMBERS_SUCCESS', () => {
      it('sets the group members with data', () => {
        const action = {
          type: `${AT.FETCH_GROUP_MEMBERS}_FETCH_SUCCESS`,
          data: [],
          next: null,
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_GROUP_MEMBERS_FAILED', () => {
      it('dispatches fetch error', () => {
        const action = {
          type: `${AT.FETCH_GROUP_MEMBERS}_FETCH_FAILED`,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
