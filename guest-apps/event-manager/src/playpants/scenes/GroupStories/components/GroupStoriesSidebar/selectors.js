import { createSelector } from 'reselect';

export const groupStoriesSidebarSelector = state =>
  state.Scenes.GroupStories.GroupStoriesSidebar;

export const selectedEventSelector = createSelector(
  groupStoriesSidebarSelector,
  groupStoriesSidebar => groupStoriesSidebar.selectedEvent
);

export const allGroupStoryEventsSelector = createSelector(
  groupStoriesSidebarSelector,
  groupStoriesSidebar => groupStoriesSidebar.allGroupStoryEvents
);

export const allGroupStoryEventsDataSelector = createSelector(
  allGroupStoryEventsSelector,
  allGroupStoryEvents => allGroupStoryEvents.data
);

export const allGroupStoryEventsLoadingSelector = createSelector(
  allGroupStoryEventsSelector,
  allGroupStoryEvents => allGroupStoryEvents.loading
);
