import * as AT from '../actionTypes';
import * as actions from '../actions';

describe('CallSearch', () => {
  describe('Action Creators', () => {
    it('CALLS_FETCH', () => {
      expect(actions.fetchCalls()).toHaveProperty('type', AT.CALLS_FETCH);
    });

    it('CALL_FETCH_SUCCESS', () => {
      expect(actions.fetchCallsSuccess({ data: [] })).toAsyncDispatch({
        type: AT.CALLS_FETCH_SUCCESS,
      });
    });

    it('CALLS_LIST_ITEM_ONCLICK', () => {
      expect(actions.callsListItemClick()).toHaveProperty(
        'type',
        AT.CALLS_LIST_ITEM_ONCLICK
      );
    });

    it('CALLS_SET_FILTER_PARAMS', () => {
      expect(actions.setFilterParams()).toHaveProperty(
        'type',
        AT.CALLS_SET_FILTER_PARAMS
      );
    });
  });
});
