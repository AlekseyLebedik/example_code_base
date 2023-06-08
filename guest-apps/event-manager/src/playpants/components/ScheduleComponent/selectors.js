import { createSelector } from 'reselect';
import isEmpty from 'lodash/isEmpty';

import {
  currentProjectSelector,
  enabledMaxCalCountriesSelector,
  eventSettingsSelector,
  eventTypeSettingsSelector,
  externalEventSourcesSelector,
  hasCurrentProjectSettingsSelector,
} from 'playpants/components/App/selectors';
import { pmgTagsSelector } from 'playpants/scenes/Schedule/selectors';
import { getEventStatusSettings } from './helpers';

const switchesSelector = state => state.switches;

export const repeatEventsEnabledSelector = createSelector(
  switchesSelector,
  switches => switches && switches.EVENT_MANAGER_REPEAT_EVENTS_ENABLED
);

export const scheduleSelector = state => state.Components.ScheduleComponent;

/** Schedule/selectedTemplate */
export const selectedTemplateSelector = createSelector(
  scheduleSelector,
  schedule => schedule.selectedTemplate
);

/** Schedule/form */
export const createEventDialogFormSelector = createSelector(
  scheduleSelector,
  schedule => schedule.form
);

export const defaultStartDateSelector = createSelector(
  createEventDialogFormSelector,
  createEventDialogForm => createEventDialogForm.defaultStartDate
);

export const defaultEndDateSelector = createSelector(
  createEventDialogFormSelector,
  createEventDialogForm => createEventDialogForm.defaultEndDate
);

export const isRangeSelector = createSelector(
  createEventDialogFormSelector,
  createEventDialogForm => createEventDialogForm.isRange
);

export const defaultToInfoSelector = createSelector(
  hasCurrentProjectSettingsSelector,
  hasCurrentProjectSettings => !hasCurrentProjectSettings
);

/** Schedule/templateSourceEvent */
export const templateSourceEventSelector = createSelector(
  scheduleSelector,
  schedule => schedule.templateSourceEvent
);

export const templateSourceEventDataSelector = createSelector(
  templateSourceEventSelector,
  templateSourceEvent => templateSourceEvent.data
);

export const templateSourceEventLoadingSelector = createSelector(
  templateSourceEventSelector,
  templateSourceEvent => templateSourceEvent.loading
);

/** Schedule/eventDetail */
export const eventDetailBaseSelector = createSelector(
  scheduleSelector,
  schedule => schedule.eventDetail
);

export const eventDetailDataSelector = createSelector(
  eventDetailBaseSelector,
  eventDetail => eventDetail.data
);

export const eventFetchDetailsSelector = createSelector(
  scheduleSelector,
  schedule => schedule.eventFetchDetails
);

/** Schedule/abTestDetail */
export const abTestDetailBaseSelector = createSelector(
  scheduleSelector,
  schedule => schedule.abTestDetail
);

export const abTestDetailDataSelector = createSelector(
  abTestDetailBaseSelector,
  abTestDetail => abTestDetail.data
);

/** Schedule/expyTestDetail */
export const expyTestDetailBaseSelector = createSelector(
  scheduleSelector,
  schedule => schedule.expyTestDetail
);

export const expyTestDetailDataSelector = createSelector(
  expyTestDetailBaseSelector,
  expyTestDetail => expyTestDetail.data
);

/** Schedule/demonwareDetail */
export const demonwareDetailBaseSelector = createSelector(
  scheduleSelector,
  schedule => schedule.demonwareDetail
);

export const demonwareDetailDataSelector = createSelector(
  demonwareDetailBaseSelector,
  demonwareDetail => demonwareDetail.data
);

/** Schedule/informationalEvents */
export const displayInfoEventsSelector = createSelector(
  eventTypeSettingsSelector,
  eventTypes => {
    if (eventTypes.some(e => e.key === 'event-manager'))
      return eventTypes.length > 1;
    return eventTypes.length > 0;
  }
);

export const infoEventsFilterTypesSelector = createSelector(
  eventTypeSettingsSelector,
  eventTypes => ({
    informationalEvents: {
      name: 'Informational',
      children: {
        ...eventTypes
          .filter(e => e.key !== 'event-manager')
          .reduce((acc, e) => {
            acc[e.key] = {
              name: e.name,
              children: null,
              selectedByDefault: true,
            };
            return acc;
          }, {}),
      },
      selectedByDefault: true,
    },
  })
);

export const infoEventTypesSelector = createSelector(
  eventTypeSettingsSelector,
  eventTypes =>
    eventTypes.filter(e => e.key !== 'event-manager').map(e => e.key)
);

/** Schedule/externalEvents */
export const displayExternalEventsSelector = createSelector(
  externalEventSourcesSelector,
  externalSources => !!externalSources.length
);

const getExternalChildren = (source, enabledCountries, pmgTags) => {
  if (source === 'holidays') {
    return [...enabledCountries].sort().reduce(
      (a, country) => ({
        ...a,
        [country]: {
          name: country,
          children: null,
          selectedByDefault: true,
        },
      }),
      {}
    );
  }
  if (source === 'pmg') {
    return [...pmgTags].sort().reduce(
      (a, tag) => ({
        ...a,
        [tag]: {
          name: tag,
          children: null,
          selectedByDefault: true,
        },
      }),
      {}
    );
  }
  return null;
};

export const externalEventsFilterTypesSelector = createSelector(
  externalEventSourcesSelector,
  enabledMaxCalCountriesSelector,
  pmgTagsSelector,
  (externalSources, enabledCountries, pmgTags) => ({
    externalEvents: {
      name: 'External',
      children: {
        ...externalSources.reduce((acc, source) => {
          acc[source] = {
            name: source.replace('-', ' '),
            children: getExternalChildren(source, enabledCountries, pmgTags),
            selectedByDefault: true,
          };
          return acc;
        }, {}),
      },
      selectedByDefault: true,
    },
  })
);

export const externalDetailBaseSelector = createSelector(
  scheduleSelector,
  schedule => schedule.externalDetail
);

export const externalDetailDataSelector = createSelector(
  externalDetailBaseSelector,
  externalDetail => externalDetail.data
);

/** Schedule/filterProps */
export const filterPropsSelector = createSelector(
  scheduleSelector,
  scheduleState => scheduleState.filterProps
);

export const filterPropsDisabledSelector = createSelector(
  filterPropsSelector,
  filterProps => filterProps.disabled
);

/** Event status filters and selectors */
export const eventSettingsStatusNamesSelector = createSelector(
  eventSettingsSelector,
  eventSettings =>
    !isEmpty(eventSettings)
      ? getEventStatusSettings(eventSettings.statuses)
      : {}
);

export const eventsFilterTypesSelector = createSelector(
  eventSettingsStatusNamesSelector,
  eventStatuses => ({
    eventManager: {
      name: 'Event Manager',
      children: eventStatuses,
      selectedByDefault: true,
    },
  })
);

const initialValuesProps = (_, props) => props.initialValues;

export const makeInitialValuesSelector = () =>
  createSelector(
    initialValuesProps,
    defaultStartDateSelector,
    defaultEndDateSelector,
    currentProjectSelector,
    (initialValues, startDate, endDate, currentProject) => ({
      eventDates: { startDate, endDate },
      eventName: '',
      eventNotes: '',
      eventType: '',
      eventEnvType: initialValues?.eventEnvType || '',
      eventProjects: [currentProject.id],
      eventRecurrence: 'never',
      eventRepeatFrequency: 1,
      eventRepeatInterval: 'days',
      isSchedule: initialValues?.isSchedule || null,
      schedule: initialValues?.schedule || null,
      story: initialValues?.story || null,
    })
  );
