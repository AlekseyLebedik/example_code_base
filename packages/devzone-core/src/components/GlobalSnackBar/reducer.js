import { GLOBAL_SNACK_BAR_SHOW, GLOBAL_SNACK_BAR_HIDE } from './actionTypes';

export const INITIAL_STATE = {
  messages: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GLOBAL_SNACK_BAR_SHOW:
      return {
        ...state,
        messages: [
          ...state.messages.filter(m => m.type !== action.message.type),
          action.message,
        ],
      };
    case GLOBAL_SNACK_BAR_HIDE:
      return {
        ...state,
        messages: state.messages.filter(m => m.type !== action.message.type),
      };
    default:
      return state;
  }
}
