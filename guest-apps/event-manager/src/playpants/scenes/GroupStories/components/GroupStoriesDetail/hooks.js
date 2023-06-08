import { useSelector } from 'react-redux';

import * as selectors from './selectors';
import { STORY_EVENT_DETAIL_ID } from './constants';

export const useGroupStoriesEventGroups = () => [
  {
    events: useSelector(selectors.eventManagerStoryEventsWithAuthSelector),
    loading: {
      error: useSelector(selectors.eventManagerStoryEventsErrorSelector),
      isLoading: useSelector(selectors.eventManagerStoryEventsLoadingSelector),
    },
    type: 'eventManager',
    modalId: STORY_EVENT_DETAIL_ID,
  },
  {
    events: useSelector(selectors.informationalStoryEventsDataSelector),
    loading: {
      error: useSelector(selectors.informationalStoryEventsErrorSelector),
      isLoading: useSelector(selectors.informationalStoryEventsLoadingSelector),
    },
    type: 'informationalEvents',
    modalId: STORY_EVENT_DETAIL_ID,
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
