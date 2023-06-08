import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { useEMPermissionsResult } from 'playpants/hooks';
import {
  enabledSourcesSelector,
  allProjectTitlesSelector,
} from 'playpants/components/App/selectors';
import { getTitleName } from 'playpants/components/App/helpers';

import CustomEvent from 'playpants/components/CustomCalendarEvent';
import {
  useEventFiltersEnabledCheck,
  useInformationalEventsEnabledCheck,
  useEventManagerEventsEnabledCheck,
} from 'playpants/components/EventFilters/hooks';
import { fetchEventDetails } from 'playpants/components/ScheduleComponent/actions';

import {
  displayExternalEventsSelector,
  displayInfoEventsSelector,
  eventsFilterTypesSelector,
  externalEventsFilterTypesSelector,
  infoEventsFilterTypesSelector,
} from './selectors';
import {
  customEventStyles as customEventStylesDefault,
  customEventStylesEventsFilter,
  filterDemonwareEvents,
  filterEvents,
  filterExternalEvents,
  filterInformationalEvents,
  filterTests,
  filterExpyTests,
} from './helpers';

import {
  AB_TESTING_EVENT_TYPES,
  DEMONWARE_EVENT_TYPES,
  EXPY_TESTING_EVENT_TYPES,
} from './constants';

import EventManagerEventLink from './components/EventManagerLink';
import TestLink from './components/ABTestLink';
import { useStyles } from './styles';

export const useDecoratedEventGroups = (eventGroups, handlers) => {
  const {
    modifyEvent,
    eventDragDrop,
    handleOpenEventDetailModal,
    handleOpenDemonwareDetailModal,
    handleOpenExternalDetailModal,
    handleOpenABTestDetailModal,
    handleOpenExpyTestDetailModal,
  } = handlers || {};
  const eventTypes = useSelector(eventsFilterTypesSelector, isEqual);
  const infoEventsFilterTypes = useSelector(
    infoEventsFilterTypesSelector,
    isEqual
  );
  const externalEventsFilterTypes = useSelector(
    externalEventsFilterTypesSelector,
    isEqual
  );
  const enabledSources = useSelector(enabledSourcesSelector, isEqual);
  const displayInfoEvents = useSelector(displayInfoEventsSelector);
  const displayExternalEvents = useSelector(displayExternalEventsSelector);
  const permissions = useEMPermissionsResult();
  const { wipPermission } = permissions;
  const eventFiltersEnabled = useEventFiltersEnabledCheck();
  // Only hide events when using the new filters
  const displayInformationalEvents =
    useInformationalEventsEnabledCheck() || !eventFiltersEnabled;
  const displayEventManagerEvents =
    useEventManagerEventsEnabledCheck() || !eventFiltersEnabled;
  const customEventStyles = eventFiltersEnabled
    ? customEventStylesEventsFilter
    : customEventStylesDefault;
  const classes = useStyles();
  const defaultGroupProps = useMemo(
    () => ({
      classes,
      CustomEvent,
      CustomEventProps: { displayTimeWithTitle: true },
      customEventStyles,
      GroupLink: EventManagerEventLink,
    }),
    [classes, customEventStyles]
  );
  return useMemo(
    () =>
      eventGroups.reduce((acc, eventGroup) => {
        switch (eventGroup.type) {
          case 'eventManager':
            if (
              enabledSources.includes('event-manager') &&
              displayEventManagerEvents
            ) {
              acc.push({
                ...defaultGroupProps,
                eventTypes,
                customEventStyles,
                eventDragDrop,
                modifyEvent,
                onSelectEvent:
                  handleOpenEventDetailModal &&
                  handleOpenEventDetailModal(eventGroup.modalId),
                wrapper: filterEvents,
                ...eventGroup,
              });
            }
            break;
          case 'informationalEvents':
            if (
              displayInfoEvents &&
              enabledSources.includes('informational') &&
              displayInformationalEvents
            ) {
              acc.push({
                ...defaultGroupProps,
                eventTypes: infoEventsFilterTypes,
                customEventStyles: (event, ...params) =>
                  customEventStyles(event, ...params, event.event_type),
                eventDragDrop,
                modifyEvent,
                onSelectEvent:
                  handleOpenEventDetailModal &&
                  handleOpenEventDetailModal(eventGroup.modalId),
                wrapper: filterInformationalEvents,
                ...eventGroup,
              });
            }
            break;
          case 'demonwareEvents':
            if (enabledSources.includes('demonware')) {
              acc.push({
                ...defaultGroupProps,
                eventTypes: DEMONWARE_EVENT_TYPES(wipPermission),
                customEventStyles: (event, ...params) =>
                  customEventStyles(event, ...params, event.event_type),
                onSelectEvent:
                  handleOpenDemonwareDetailModal &&
                  handleOpenDemonwareDetailModal(eventGroup.modalId),
                wrapper: filterDemonwareEvents,
                ...eventGroup,
              });
            }
            break;
          case 'externalEvents':
            if (displayExternalEvents) {
              acc.push({
                ...defaultGroupProps,
                eventTypes: externalEventsFilterTypes,
                customEventStyles: (event, ...params) =>
                  customEventStyles(event, ...params, event.event_type),
                CustomEventProps: { displayTimeWithTitle: false },
                onSelectEvent:
                  handleOpenExternalDetailModal &&
                  handleOpenExternalDetailModal(eventGroup.modalId),
                wrapper: filterExternalEvents,
                ...eventGroup,
              });
            }
            break;
          case 'abTesting':
            if (enabledSources.includes('ab-testing')) {
              acc.push({
                ...defaultGroupProps,
                eventTypes: AB_TESTING_EVENT_TYPES,
                customEventStyles,
                GroupLink: TestLink,
                onSelectEvent:
                  handleOpenABTestDetailModal &&
                  handleOpenABTestDetailModal(eventGroup.modalId),
                wrapper: filterTests,
                ...eventGroup,
              });
            }
            break;
          case 'expyTests':
            if (enabledSources.includes('expy-tests')) {
              acc.push({
                ...defaultGroupProps,
                eventTypes: EXPY_TESTING_EVENT_TYPES,
                customEventStyles,
                onSelectEvent:
                  handleOpenExpyTestDetailModal &&
                  handleOpenExpyTestDetailModal(eventGroup.modalId),
                wrapper: filterExpyTests,
                ...eventGroup,
              });
            }
            break;
          default:
            break;
        }
        return acc;
      }, []),
    [
      wipPermission,
      modifyEvent,
      customEventStyles,
      defaultGroupProps,
      displayEventManagerEvents,
      displayExternalEvents,
      displayInfoEvents,
      displayInformationalEvents,
      enabledSources,
      eventDragDrop,
      eventGroups,
      eventTypes,
      externalEventsFilterTypes,
      handleOpenABTestDetailModal,
      handleOpenDemonwareDetailModal,
      handleOpenEventDetailModal,
      handleOpenExpyTestDetailModal,
      handleOpenExternalDetailModal,
      infoEventsFilterTypes,
    ]
  );
};

export const useFetchEventDetails = () => {
  const dispatch = useDispatch();
  return useCallback(event => dispatch(fetchEventDetails(event)), [dispatch]);
};

export const useTitleNameSelector = () => {
  const titles = useSelector(allProjectTitlesSelector, isEqual);
  return useCallback(
    (titleId, substring = true) =>
      titleId ? getTitleName(titleId, titles, substring) : titleId,
    [titles]
  );
};
