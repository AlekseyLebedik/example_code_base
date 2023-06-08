import * as AT from 'playpants/components/ScheduleComponent/actionTypes';

export const SCOPE = 'playpants/SCHEDULE_STORIES_CALENDAR';

export const FETCH_EVENT_MANAGER_EVENTS = SCOPE + AT.FETCH_EVENT_MANAGER_EVENTS;
export const FETCH_EVENT_MANAGER_EVENTS_FAILED =
  SCOPE + AT.FETCH_EVENT_MANAGER_EVENTS_FAILED;
export const FETCH_EVENT_MANAGER_EVENTS_SUCCESS =
  SCOPE + AT.FETCH_EVENT_MANAGER_EVENTS_SUCCESS;

export const FETCH_INFORMATIONAL_EVENTS = SCOPE + AT.FETCH_INFORMATIONAL_EVENTS;
export const FETCH_INFORMATIONAL_EVENTS_FAILED =
  SCOPE + AT.FETCH_INFORMATIONAL_EVENTS_FAILED;
export const FETCH_INFORMATIONAL_EVENTS_SUCCESS =
  SCOPE + AT.FETCH_INFORMATIONAL_EVENTS_SUCCESS;

export const RESET_SCHEDULE_STORIES_CALENDAR = `${SCOPE}.RESET`;