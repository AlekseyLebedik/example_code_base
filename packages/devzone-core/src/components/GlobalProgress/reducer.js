import { actionTypes as AT } from './constants';

export const INITIAL_STATE = {
  loading: 0,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AT.START:
      return { loading: state.loading + 1 };
    case AT.DONE:
      return { loading: Math.max(0, state.loading - 1) };
    case AT.RESET:
      return { loading: 0 };
    default:
      return state;
  }
}
