import { createSelector } from 'reselect';
import AUTH_STATUS from 'playpants/constants/authStatus';

export const groupStoriesDetailSelector = state =>
  state.Scenes.GroupStories.GroupStoriesDetail;

/** GroupStoriesDetail/eventManagerStoryEvents */
export const eventManagerStoryEventsSelector = createSelector(
  groupStoriesDetailSelector,
  groupStoriesDetail => groupStoriesDetail.eventManagerEvents
);

export const eventManagerStoryEventsDataSelector = createSelector(
  eventManagerStoryEventsSelector,
  eventManagerStoryEvents => eventManagerStoryEvents.data
);

export const eventManagerStoryEventsLoadingSelector = createSelector(
  eventManagerStoryEventsSelector,
  eventManagerStoryEvents => eventManagerStoryEvents.loading
);

export const eventManagerStoryEventsErrorSelector = createSelector(
  eventManagerStoryEventsSelector,
  eventManagerStoryEvents => eventManagerStoryEvents.error
);

export const eventManagerStoryEventsWithAuthSelector = createSelector(
  eventManagerStoryEventsDataSelector,
  eventManagerStoryEventsData =>
    eventManagerStoryEventsData.map(event => ({
      authStatus: AUTH_STATUS[event.status],
      ...event,
    }))
);

/** StoryDetail/informationalStoryEvents */
export const informationalStoryEventsSelector = createSelector(
  groupStoriesDetailSelector,
  groupStoriesDetail => groupStoriesDetail.informationalEvents
);

export const informationalStoryEventsDataSelector = createSelector(
  informationalStoryEventsSelector,
  informationalStoryEvents => informationalStoryEvents.data
);

export const informationalStoryEventsLoadingSelector = createSelector(
  informationalStoryEventsSelector,
  informationalStoryEvents => informationalStoryEvents.loading
);

export const informationalStoryEventsErrorSelector = createSelector(
  informationalStoryEventsSelector,
  informationalStoryEvents => informationalStoryEvents.error
);

export const eventsLoadingSelector = createSelector(
  eventManagerStoryEventsLoadingSelector,
  informationalStoryEventsLoadingSelector,
  (eventManagerEventsLoading, informationalEventsLoading) =>
    eventManagerEventsLoading || informationalEventsLoading
);

export const eventsErrorSelector = createSelector(
  eventManagerStoryEventsErrorSelector,
  informationalStoryEventsErrorSelector,
  (eventManagerEventsError, informationalEventsError) =>
    eventManagerEventsError || informationalEventsError
);
