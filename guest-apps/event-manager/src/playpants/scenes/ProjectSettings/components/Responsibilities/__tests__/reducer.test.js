import mockState from 'playpants/testUtils/mockState';
import reducer from '../reducer';
import * as AT from '../actionTypes';

const { Responsibilities } = mockState.Scenes.ProjectSettings;

describe('Groups', () => {
  describe('groupsReducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      ...Responsibilities,
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

  describe('responsibilityOptionsReducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      ...Responsibilities,
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('FETCH_RESPONSIBILITY_OPTIONS', () => {
      it('initiates fetch for responsibility options', () => {
        const action = {
          type: `${AT.FETCH_RESPONSIBILITY_OPTIONS}_FETCH`,
          urlID: null,
          params: {},
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_RESPONSIBILITY_OPTIONS_SUCCESS', () => {
      it('sets the responsibility options with data', () => {
        const action = {
          type: `${AT.FETCH_RESPONSIBILITY_OPTIONS}_FETCH_SUCCESS`,
          data: [],
          next: null,
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_RESPONSIBILITY_OPTIONS_FAILED', () => {
      it('dispatches fetch error', () => {
        const action = {
          type: `${AT.FETCH_RESPONSIBILITY_OPTIONS}_FETCH_FAILED`,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });

  describe('responsibilityGroupsReducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      ...Responsibilities,
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('FETCH_RESPONSIBILITY_GROUPS', () => {
      it('initiates fetch for responsibility groups', () => {
        const action = {
          type: `${AT.FETCH_RESPONSIBILITY_GROUPS}_FETCH`,
          urlID: null,
          params: {},
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_RESPONSIBILITY_GROUPS_SUCCESS', () => {
      it('sets the responsibility groups with data', () => {
        const action = {
          type: `${AT.FETCH_RESPONSIBILITY_GROUPS}_FETCH_SUCCESS`,
          data: [],
          next: null,
          append: false,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FETCH_RESPONSIBILITY_GROUPS_FAILED', () => {
      it('dispatches fetch error', () => {
        const action = {
          type: `${AT.FETCH_RESPONSIBILITY_GROUPS}_FETCH_FAILED`,
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
