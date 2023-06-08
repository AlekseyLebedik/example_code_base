import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';
import { titleEnvsSelector } from 'playpants/components/App/selectors';
import { selectedScheduleStorySelector } from 'playpants/scenes/Timewarp/components/ScheduleStories/selectors';
import STATUS_CODE from 'playpants/constants/statusCode';

export const scheduleStoriesDetailSelector = state =>
  state.Scenes.Timewarp.scheduleStories.ScheduleStoriesDetail
    .scheduleStoriesDetail;

/** scheduleStoriesDetail/contexts */
export const detailContextsSelector = createSelector(
  scheduleStoriesDetailSelector,
  scheduleStoriesDetail => scheduleStoriesDetail.contexts
);

export const detailContextsDataSelector = createSelector(
  detailContextsSelector,
  detailContexts => detailContexts.data
);

export const detailContextsLoadingSelector = createSelector(
  detailContextsSelector,
  detailContexts => detailContexts.loading
);

/** categories fetch data */
export const categoriesFetchDataSelector = createSelector(
  selectedScheduleStorySelector,
  detailContextsDataSelector,
  titleEnvsSelector,
  (selectedScheduleStory, detailContextsData, titleEnvs) => {
    const { context } = selectedScheduleStory;
    const detailContext = detailContextsData.find(
      detailContexts => detailContexts.id === context
    );
    const titleEnv = titleEnvs.find(
      currentTitleEnv => currentTitleEnv.id === selectedScheduleStory.title_env
    );
    return {
      context: detailContext?.name || null,
      titleId: titleEnv.titleId,
      env: titleEnv.shortType,
    };
  }
);

/** scheduleStoriesDetail/categories */
export const categoriesSelector = createSelector(
  scheduleStoriesDetailSelector,
  scheduleStoriesDetail => scheduleStoriesDetail.categories
);

export const categoriesDataSelector = createSelector(
  categoriesSelector,
  categories => categories.data
);

export const categoriesLoadingSelector = createSelector(
  categoriesSelector,
  categories => categories.loading
);

export const categoryOptionsSelector = createSelector(
  categoriesDataSelector,
  categoriesData =>
    categoriesData.map(category => ({
      label: category.name,
      value: category.name,
    }))
);

/** scheduleStoriesDetail/eventCount */
export const eventCountSelector = createSelector(
  scheduleStoriesDetailSelector,
  scheduleStoriesDetail => scheduleStoriesDetail.eventCount
);

export const eventCountLoadingSelector = createSelector(
  eventCountSelector,
  eventCount => eventCount.loading
);

export const eventCountDataSelector = createSelector(
  eventCountSelector,
  eventCount => eventCount.data
);

export const eventCountErrorSelector = createSelector(
  eventCountSelector,
  eventCount => eventCount.error
);

export const selectedScheduleStoryContextNameSelector = createSelector(
  selectedScheduleStorySelector,
  detailContextsDataSelector,
  (selectedScheduleStory, detailContextsData) => {
    const { context } = selectedScheduleStory;
    if (!context) return '---';
    const detailContext = detailContextsData.find(
      detailContexts => detailContexts.id === context
    );
    if (!detailContext) return `${context} - (DELETED)`;
    return detailContext.name;
  }
);

export const makeIsSafeSelector = detachedSchedule =>
  createSelector(selectedScheduleStorySelector, selectedScheduleStory => {
    const hasSelected = !isEmpty(selectedScheduleStory);
    const isPublished =
      hasSelected && selectedScheduleStory.state === STATUS_CODE.PUBLISHED;
    const isScheduling =
      hasSelected && selectedScheduleStory.state === STATUS_CODE.SCHEDULED;
    const isTask =
      isScheduling && selectedScheduleStory.task
        ? {
            inProgress: selectedScheduleStory.task.state === 'in-progress',
            failed: selectedScheduleStory.task.state === 'failed',
          }
        : null;
    const isNotInProgress = isScheduling && !!isTask && !isTask.inProgress;
    const isSchedulingMsg = !isNotInProgress && !isTask && 'Task is scheduling';
    const isInProgressMsg =
      !isNotInProgress && !!isTask && isTask.inProgress && 'Task in progress';
    const unsafeReason = isSchedulingMsg || isInProgressMsg;

    return {
      toDelete: isPublished || isNotInProgress || detachedSchedule,
      toEditSchedule: isPublished || isNotInProgress || detachedSchedule,
      unsafeReason,
    };
  });
