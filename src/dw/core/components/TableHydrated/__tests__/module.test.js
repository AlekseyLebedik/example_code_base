import reducer from '../reducer';
import * as AT from '../actionTypes';
import * as actions from '../actions';

const selectedRowKeys = [1, 2, 3];
const setSelectedRowKeys = actions.setSelectedRowKeys(selectedRowKeys);

describe('TableHydrated', () => {
  describe('Action Creators', () => {
    it('SET_SELECTED_ROW_KEYS', () => {
      expect(setSelectedRowKeys).toHaveProperty(
        'type',
        AT.SET_SELECTED_ROW_KEYS
      );
      expect(setSelectedRowKeys).toHaveProperty(
        'selectedRowKeys',
        selectedRowKeys
      );
    });
  });

  describe('Reducer', () => {
    it('returns initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handles SET_SELECTED_ROW_KEYS', () => {
      expect(reducer(undefined, setSelectedRowKeys)).toMatchSnapshot();
    });
  });
});
