import * as actions from '../actions';
import reducer from '../reducer';

describe('CallSearch', () => {
  describe('Reducer', () => {
    let initialState = null;
    beforeEach(() => {
      initialState = {
        ...reducer(undefined, {}),
        calls: ['call-1', 'call-2'],
      };
    });

    it('returns initial state', () => {
      const state = reducer(undefined, {});
      expect(state).toMatchSnapshot();
    });

    describe('CALL_FETCH_SUCCESS', () => {
      it('replaces current data when append is false', () => {
        const action = actions.fetchCallsSuccess(
          { data: ['call-3', 'call-4'] },
          false
        );
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
      it('appends new data into current data when append is true', () => {
        const action = actions.fetchCallsSuccess(
          { data: ['call-3', 'call-4'] },
          true
        );
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('CALL_LIST_ITEM_ONCLICK', () => {
      it('sets the selectedCall acording with the action', () => {
        const action = actions.callsListItemClick('call-1');
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });

    describe('CALL_SET_FILTER_PARAMS', () => {
      it('sets the search param', () => {
        const action = actions.setFilterParams({ name: 'call-1' });
        const state = reducer(initialState, action);
        expect(state).toMatchSnapshot();
      });
    });
  });
});
