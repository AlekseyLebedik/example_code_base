import mockState from 'playpants/testUtils/mockState';
import reducer from '../reducer';
import * as AT from '../actionTypes';

describe('ProjectSettings', () => {
  describe('Reducer', () => {
    const initialState = {
      ...reducer(undefined, {}),
      ...mockState.Scenes.ProjectSettings,
    };

    it('returns default state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('availableUsersReducer', () => {
      it('returns default state', () => {
        const state = reducer(undefined, {});
        expect(state).toMatchSnapshot();
      });

      describe('FETCH_AVAILABLE_USERS', () => {
        it('initiates fetch for users', () => {
          const action = {
            type: `${AT.FETCH_AVAILABLE_USERS}_FETCH`,
            urlID: null,
            params: { sort: 'name' },
            append: false,
          };
          const state = reducer(initialState, action);
          expect(state).toMatchSnapshot();
        });
      });

      describe('FETCH_AVAILABLE_USERS_SUCCESS', () => {
        it('sets the available user with data', () => {
          const action = {
            type: `${AT.FETCH_AVAILABLE_USERS}_FETCH_SUCCESS`,
            data: [],
            next: null,
            append: false,
          };
          const state = reducer(initialState, action);
          expect(state).toMatchSnapshot();
        });
      });

      describe('FETCH_AVAILABLE_USERS_FAILED', () => {
        it('dispatches fetch error', () => {
          const action = {
            type: `${AT.FETCH_AVAILABLE_USERS}_FETCH_FAILED`,
          };
          const state = reducer(initialState, action);
          expect(state).toMatchSnapshot();
        });
      });
    });

    describe('CHANGE_TAB', () => {
      it('sets the project settings tab if tab type PS is received', () => {
        const action = {
          type: AT.CHANGE_TAB,
          tabType: 'PS',
          selectedTab: 'authorizers',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });

      it('sets the project environment settings tab otherwise', () => {
        const action = {
          type: AT.CHANGE_TAB,
          tabType: 'PES',
          selectedPESTab: 'cert',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('USERS_SEARCH', () => {
      it('sets the search value from query', () => {
        const action = {
          type: AT.USERS_SEARCH,
          query: 'test',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('FILTER_GROUPS', () => {
      it('changes the selected group for user filter', () => {
        const action = {
          type: AT.FILTER_GROUPS,
          group: 'Demonware',
        };
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
