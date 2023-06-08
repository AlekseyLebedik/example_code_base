import * as creators from 'playpants/components/ScheduleComponent/actionCreators';
import * as AT from './actionTypes';

/**
 * Resets all the Grouped Stories Detail data stored to initial reducer state
 */
export const resetGroupStoriesDetail = () => ({
  type: AT.RESET_GROUP_STORIES_DETAIL,
});

export const fetchEventManagerEvents = creators.fetchEventManagerEvents(
  AT.FETCH_EVENT_MANAGER_EVENTS
);
export const fetchEventManagerEventsSuccess =
  creators.fetchEventManagerEventsSuccess(
    AT.FETCH_EVENT_MANAGER_EVENTS_SUCCESS
  );
export const fetchEventManagerEventsFailed =
  creators.fetchEventManagerEventsFailed(AT.FETCH_EVENT_MANAGER_EVENTS_FAILED);

export const fetchInformationalEvents = creators.fetchInformationalEvents(
  AT.FETCH_INFORMATIONAL_EVENTS
);
export const fetchInformationalEventsSuccess =
  creators.fetchInformationalEventsSuccess(
    AT.FETCH_INFORMATIONAL_EVENTS_SUCCESS
  );
export const fetchInformationalEventsFailed =
  creators.fetchInformationalEventsFailed(AT.FETCH_INFORMATIONAL_EVENTS_FAILED);
