import { createSelector } from '@reduxjs/toolkit';
import { hiddenGroupsSelector } from 'playpants/components/GamertagManagement/selectors';
import { timezoneOrDefaultSelector } from 'playpants/helpers/dateTime';
import { RootState } from 'playpants/types/store';
import {
  Schedule,
  ExternalEvent,
  ExternalEventTag,
  GamertagGroup,
} from 'playpants/types/schedule';

export const scheduleSelector = (state: RootState): Schedule =>
  state.Scenes.Schedule;

export const scheduleEventsSelector = createSelector(
  scheduleSelector,
  scheduleState => scheduleState.events
);

/** Schedule/eventManagerEvents */
export const eventManagerEventsSelector = createSelector(
  scheduleEventsSelector,
  schedule => schedule.eventManagerEvents
);

export const eventManagerEventsDataSelector = createSelector(
  eventManagerEventsSelector,
  eventManagerEvents => eventManagerEvents.data
);

export const eventManagerEventsLoadingSelector = createSelector(
  eventManagerEventsSelector,
  eventManagerEvents => eventManagerEvents.loading
);

export const eventManagerEventsErrorSelector = createSelector(
  eventManagerEventsSelector,
  eventManagerEvents => eventManagerEvents.error
);

/** Schedule/externalEvents */
export const externalEventsSelector = createSelector(
  scheduleEventsSelector,
  schedule => schedule.externalEvents
);

export const externalEventsDataSelector = createSelector(
  externalEventsSelector,
  externalEvents => externalEvents.data
);

export const pmgEventsDataSelector = createSelector(
  externalEventsDataSelector,
  externalEventsData =>
    externalEventsData.filter((e: ExternalEvent) => e.event_type === 'pmg')
);

export const pmgTagsSelector = createSelector(
  pmgEventsDataSelector,
  pmgEventsData => {
    const arr: string[] = [];
    return pmgEventsData !== undefined
      ? [
          'Other',
          ...new Set(
            arr.concat(
              ...pmgEventsData.map((e: ExternalEvent) =>
                e.tags
                  .filter((t: ExternalEventTag) => t.tag_type === 'Title')
                  .map((t: ExternalEventTag) => t.value)
              )
            )
          ),
        ]
      : [];
  }
);

export const externalEventsLoadingSelector = createSelector(
  externalEventsSelector,
  externalEvents => externalEvents.loading
);

export const externalEventsErrorSelector = createSelector(
  externalEventsSelector,
  externalEvents => externalEvents.error
);

/** Schedule/informationalEvents */
export const informationalEventsSelector = createSelector(
  scheduleEventsSelector,
  schedule => schedule.informationalEvents
);

export const informationalEventsDataSelector = createSelector(
  informationalEventsSelector,
  informationalEvents => informationalEvents.data
);

export const informationalEventsLoadingSelector = createSelector(
  informationalEventsSelector,
  informationalEvents => informationalEvents.loading
);

export const informationalEventsErrorSelector = createSelector(
  informationalEventsSelector,
  informationalEvents => informationalEvents.error
);

/** Schedule/demonwareEvents */
export const demonwareEventsSelector = createSelector(
  scheduleEventsSelector,
  schedule => schedule.demonwareEvents
);

export const demonwareEventsDataSelector = createSelector(
  demonwareEventsSelector,
  demonwareEvents => demonwareEvents.data
);

export const demonwareEventsLoadingSelector = createSelector(
  demonwareEventsSelector,
  demonwareEvents => demonwareEvents.loading
);

export const demonwareEventsErrorSelector = createSelector(
  demonwareEventsSelector,
  demonwareEvents => demonwareEvents.error
);

/** Schedule/abTests */
export const abTestsBaseSelector = createSelector(
  scheduleEventsSelector,
  schedule => schedule.abTests
);

export const abTestsDataSelector = createSelector(
  abTestsBaseSelector,
  abTests => abTests.data
);

export const abTestsLoadingSelector = createSelector(
  abTestsBaseSelector,
  abTests => abTests.loading
);

export const abTestsErrorSelector = createSelector(
  abTestsBaseSelector,
  abTests => abTests.error
);

/** Schedule/expyTests */
export const expyTestsBaseSelector = createSelector(
  scheduleEventsSelector,
  schedule => schedule.expyTests
);

export const expyTestsDataSelector = createSelector(
  expyTestsBaseSelector,
  expyTests => expyTests.data
);

export const expyTestsLoadingSelector = createSelector(
  expyTestsBaseSelector,
  expyTests => expyTests.loading
);

export const expyTestsErrorSelector = createSelector(
  expyTestsBaseSelector,
  expyTests => expyTests.error
);

/** Schedule Gamertag Groups */
export const scheduleGamertagGroupsSelector = createSelector(
  scheduleSelector,
  scheduleState => scheduleState.gamertagGroups
);

export const scheduleGamertagGroupsDataSelector = createSelector(
  scheduleGamertagGroupsSelector,
  gamertagGroupsState => gamertagGroupsState?.data
);

export const scheduleGamertagGroupsErrorSelector = createSelector(
  scheduleGamertagGroupsSelector,
  gamertagGroupsState => gamertagGroupsState?.error
);

export const scheduleGamertagGroupsFormattedSelector = createSelector(
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  scheduleGamertagGroupsDataSelector,
  hiddenGroupsSelector,
  timezoneOrDefaultSelector,
  (groups: GamertagGroup[], hiddenGroups: string[]) =>
    groups.map((group: GamertagGroup) => {
      const { id, timewarp_settings: { color } = {} } = group;
      return {
        ...group,
        color,
        active: !(hiddenGroups && hiddenGroups.includes(id.toString())),
      };
    })
);

export const eventsLoadingSelector = createSelector(
  eventManagerEventsLoadingSelector,
  informationalEventsLoadingSelector,
  externalEventsLoadingSelector,
  abTestsLoadingSelector,
  (
    eventManagerEventsLoading,
    informationalEventsLoading,
    externalEventsLoading,
    abTestsLoading
  ) =>
    eventManagerEventsLoading ||
    informationalEventsLoading ||
    externalEventsLoading ||
    abTestsLoading
);

export const eventsErrorSelector = createSelector(
  eventManagerEventsErrorSelector,
  informationalEventsErrorSelector,
  (eventManagerEventsError, informationalEventsError) =>
    eventManagerEventsError || informationalEventsError
);
