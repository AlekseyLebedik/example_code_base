import { createSelector } from 'reselect';
import { titleEnvsSelector } from 'playpants/components/App/selectors';
import { selectedScheduleStorySelector } from 'playpants/scenes/Timewarp/components/ScheduleStories/selectors';

export const scheduleStoriesCalendarSelector = state =>
  state.Scenes.Timewarp.scheduleStories.ScheduleStoriesDetail
    .scheduleStoriesCalendar;

export const eventEnvTypeSelector = createSelector(
  selectedScheduleStorySelector,
  titleEnvsSelector,
  ({ title_env: titleEnv }, titleEnvOptions) =>
    titleEnvOptions.find(t => t.id === titleEnv)?.type || ''
);

/** ScheduleStoriesCalendar/eventManagerStoryEvents */
export const eventManagerStoryEventsSelector = createSelector(
  scheduleStoriesCalendarSelector,
  scheduleStoriesCalendar => scheduleStoriesCalendar.eventManagerEvents
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

/** ScheduleStoriesCalendar/informationalStoryEvents */
export const informationalStoryEventsSelector = createSelector(
  scheduleStoriesCalendarSelector,
  scheduleStoriesCalendar => scheduleStoriesCalendar.informationalEvents
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
