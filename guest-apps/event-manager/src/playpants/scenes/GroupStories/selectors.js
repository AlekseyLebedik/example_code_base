import { createSelector } from 'reselect';

export const groupStoriesSelector = state => state.Scenes.GroupStories;

/** GroupStories/searchedGroupStories */
export const searchedGroupStoriesSelector = createSelector(
  groupStoriesSelector,
  groupStoriesState => groupStoriesState.searchedGroupStories
);

export const searchedGroupStoriesDataSelector = createSelector(
  searchedGroupStoriesSelector,
  searchedGroupStories =>
    searchedGroupStories.data.filter(
      story => !story.schedule && !story.title_env
    )
);

export const searchedGroupStoriesLoadingSelector = createSelector(
  searchedGroupStoriesSelector,
  searchedGroupStories => searchedGroupStories.loading
);

export const searchedGroupStoriesNextSelector = createSelector(
  searchedGroupStoriesSelector,
  searchedGroupStories => searchedGroupStories.next
);

export const searchedGroupStoriesParamsSelector = createSelector(
  searchedGroupStoriesSelector,
  searchedGroupStories => searchedGroupStories.params
);

/** GroupStories/selectedGroupStory */
export const selectedGroupStorySelector = createSelector(
  groupStoriesSelector,
  groupStoriesState => groupStoriesState.selectedGroupStory
);
