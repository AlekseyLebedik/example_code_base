import * as AT from './actionTypes';

export default function reducer(state, action) {
  switch (action.type) {
    case AT.GRANT_PRODUCTS_POST:
      return {
        ...state,
        loading: true,
      };
    case AT.GRANT_PRODUCTS_POST_SUCCESS:
    case AT.GRANT_PRODUCTS_POST_FAILED:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
