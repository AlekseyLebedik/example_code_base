import * as AT from './actionTypes';
import { EVENTS } from './constants';

const INITIAL_STATE = () => {
  const state = {};
  Object.keys(EVENTS).forEach(eventType => {
    state[eventType] = [];
  });
  return state;
};

const reducer = (state = INITIAL_STATE(), action) => {
  switch (action.type) {
    case AT.EVENTS_FETCH_SUCCESS: {
      const { name, data } = action.payload;
      const newEvents = { ...state };
      newEvents[name] = action.append ? [...newEvents[name], ...data] : data;
      return newEvents;
    }
    default:
      return state;
  }
};

export default reducer;
