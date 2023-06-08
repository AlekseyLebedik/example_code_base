import * as AT from '../actionTypes';

export default function reducer(state, action) {
  switch (action.type) {
    case AT.ASSET_CHANGE_POST:
      return {
        ...state,
        loading: true,
      };
    case AT.ASSET_CHANGE_POST_SUCCESS:
    case AT.ASSET_CHANGE_POST_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
