import { createSelector } from 'reselect';
import flatMap from 'lodash/flatMap';
import { timezoneOrDefaultSelector } from 'dw/core/helpers/date-time';
import { addLocalTimezoneOffset, isChecked } from './helpers';

export const eventsCalendarBaseSelector = (state, props) => {
  const settings = state.Core.EventsCalendar;
  const filters = props?.filters || {};
  return {
    ...settings,
    filters: {
      ...settings.filters,
      ...filters,
    },
  };
};

export const selectedViewSelector = createSelector(
  eventsCalendarBaseSelector,
  eventsCalendar => eventsCalendar.selectedView
);

export const displayViewSelector = createSelector(
  eventsCalendarBaseSelector,
  eventsCalendar => eventsCalendar.displayView
);

export const numberOfDaysSelector = createSelector(
  eventsCalendarBaseSelector,
  eventsCalendar => eventsCalendar.numberOfDays
);

export const selectedDaySelector = createSelector(
  eventsCalendarBaseSelector,
  eventsCalendar => eventsCalendar.selectedDay
);

export const isCalendarViewSelector = createSelector(
  displayViewSelector,
  displayView => displayView === 'calendar'
);

const filterDataSelector = createSelector(
  eventsCalendarBaseSelector,
  ({ filters }) => filters || {}
);
const getEventGroupsFromProps = (_, props) => props.eventGroups;
const getAffiliatedProjectsFromProps = (_, props) => props.affiliatedProjects;

const readOnlyCallbackDefault = event =>
  event.status !== 'open' ||
  event.is_manually_locked === true ||
  event.is_schedule === true;

export const makeFilteredEventsSelector = ({
  addOffset = true,
  readOnlyCallback = readOnlyCallbackDefault,
} = {}) =>
  createSelector(
    eventsCalendarBaseSelector,
    timezoneOrDefaultSelector,
    getEventGroupsFromProps,
    getAffiliatedProjectsFromProps,
    ({ eventTimeOffset, filters }, userTimezone, eventGroups, projects) =>
      flatMap(
        eventGroups.map(group =>
          group.wrapper(
            group.events,
            group.type,
            userTimezone,
            filters,
            projects
          )
        )
      ).map(event => {
        const isReadOnly = readOnlyCallback(event);
        const { start, end, ...newEvent } = event;

        return (
          event &&
          (addOffset
            ? {
                ...addLocalTimezoneOffset(
                  { ...event, isReadOnly },
                  eventTimeOffset
                ),
              }
            : { ...newEvent, isReadOnly })
        );
      })
  );

const getGamertagGroupsFromProps = (_, props) => props.gamertagGroups || [];

export const makeFilteredGamertagGroupsSelector = () =>
  createSelector(
    filterDataSelector,
    getGamertagGroupsFromProps,
    ({ gamertags }, gamertagGroups) =>
      gamertagGroups.filter(g => gamertags[g.name])
  );

export const sourcesCheckboxesSelector = createSelector(
  filterDataSelector,
  filterData => filterData.sources || {}
);

export const sourcesLoadingStatusesSelector = createSelector(
  eventsCalendarBaseSelector,
  eventsCalendar => eventsCalendar.groupLoadingStatuses
);

export const showAllColorsSelector = createSelector(
  sourcesCheckboxesSelector,
  sourcesLoadingStatusesSelector,
  (checkboxes, loadingStatuses) => {
    const activeEntries = Object.entries(checkboxes).filter(
      ([groupName, groupData]) =>
        isChecked(groupData) && !loadingStatuses[groupName]?.error
    );
    return activeEntries.length < 2;
  }
);
