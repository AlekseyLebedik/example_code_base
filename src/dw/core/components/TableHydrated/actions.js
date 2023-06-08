import * as AT from './actionTypes';

export const setSelectedRowKeys = selectedRowKeys => ({
  type: AT.SET_SELECTED_ROW_KEYS,
  selectedRowKeys,
});
