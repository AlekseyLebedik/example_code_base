import { useSelector } from 'react-redux';
import * as selectors from './selectors';
import { SCHEDULE_STORIES_CALENDAR_EVENT_DETAIL } from './constants';

export const useScheduleEventGroups = () => [
  {
    events: useSelector(selectors.eventManagerStoryEventsDataSelector),
    loading: {
      error: useSelector(selectors.eventManagerStoryEventsErrorSelector),
      isLoading: useSelector(selectors.eventManagerStoryEventsLoadingSelector),
    },
    type: 'eventManager',
    modalId: SCHEDULE_STORIES_CALENDAR_EVENT_DETAIL,
  },
  {
    events: useSelector(selectors.informationalStoryEventsDataSelector),
    loading: {
      error: useSelector(selectors.informationalStoryEventsErrorSelector),
      isLoading: useSelector(selectors.informationalStoryEventsLoadingSelector),
    },
    type: 'informationalEvents',
    modalId: SCHEDULE_STORIES_CALENDAR_EVENT_DETAIL,
  },
  {
    events: [],
    loading: {
      error: null,
      isLoading: false,
    },
    type: 'demonwareEvents',
  },
  {
    events: [],
    loading: {
      error: null,
      isLoading: false,
    },
    type: 'externalEvents',
  },
  {
    events: [],
    loading: {
      error: null,
      isLoading: false,
    },
    type: 'abTesting',
  },
];
