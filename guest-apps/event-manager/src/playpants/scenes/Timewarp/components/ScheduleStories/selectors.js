import { createSelector } from 'reselect';

export const scheduleStoriesSelector = state =>
  state.Scenes.Timewarp.scheduleStories;

/** ScheduleStories/searchedScheduleStories */
export const searchedScheduleStoriesSelector = createSelector(
  scheduleStoriesSelector,
  scheduleStoriesState => scheduleStoriesState.searchedScheduleStories
);

export const searchedScheduleStoriesDataSelector = createSelector(
  searchedScheduleStoriesSelector,
  searchedScheduleStories => searchedScheduleStories.data
);

export const searchedScheduleStoriesLoadingSelector = createSelector(
  searchedScheduleStoriesSelector,
  searchedScheduleStories => searchedScheduleStories.loading
);

export const searchedScheduleStoriesNextSelector = createSelector(
  searchedScheduleStoriesSelector,
  searchedScheduleStories => searchedScheduleStories.next
);

export const searchedScheduleStoriesParamsSelector = createSelector(
  searchedScheduleStoriesSelector,
  searchedScheduleStories => searchedScheduleStories.params
);

/** Schedule/selectedScheduleStory */
export const selectedScheduleStorySelector = createSelector(
  scheduleStoriesSelector,
  scheduleStoriesState => scheduleStoriesState.selectedScheduleStory
);
