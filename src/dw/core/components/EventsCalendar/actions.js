import * as AT from './actionTypes';

export const setEventsCalendarSettings = calendarSettings => ({
  type: AT.SET_EVENTS_CALENDAR_SETTINGS,
  calendarSettings,
});

export const clearEventsCalendarSettings = () => ({
  type: AT.CLEAR_EVENTS_CALENDAR_SETTINGS,
});
