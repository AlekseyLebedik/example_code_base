import * as AT from './actionTypes';

export function fetchEvents() {
  return {
    type: AT.EVENTS_FETCH,
  };
}

export function fetchEventsSuccess(payload, append) {
  return {
    type: AT.EVENTS_FETCH_SUCCESS,
    payload,
    append,
  };
}

export function fetchEventsFailed() {}
