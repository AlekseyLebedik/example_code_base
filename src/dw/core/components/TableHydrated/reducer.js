import * as AT from './actionTypes';

const INITIAL_STATE = {
  selectedRowKeys: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AT.SET_SELECTED_ROW_KEYS:
      return {
        ...state,
        selectedRowKeys: action.selectedRowKeys,
      };
    default:
      return state;
  }
}
