import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import isEqual from 'lodash/isEqual';
import {
  datesAreSameDay,
  dateToDefaultTimestamp,
  formatDateTimeSelector,
  getNowTimestamp,
  minMaxDateToMoment,
  timestampToMoment,
  timezoneOrDefaultSelector,
} from 'playpants/helpers/dateTime';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { eventsCalendarBaseSelector } from 'dw/core/components/EventsCalendar/selectors';
import { useEMPermissionsResult } from 'playpants/hooks';
import { useEventFiltersEnabledCheck } from 'playpants/components/EventFilters/hooks';
import {
  affiliatedProjectsSelector,
  presetOptionsSelector,
  currentProjectSelector,
  currentUserSelector,
  eventSettingsSelector,
  getBaseURL,
  platformSettingsSelector,
  projectSettingsIdSelector,
} from 'playpants/components/App/selectors';
import { scheduleGamertagGroupsErrorSelector } from 'playpants/scenes/Schedule/selectors';
import { updateProjectSetting } from 'playpants/scenes/ProjectSettings/actions';
import { fetchEvent } from 'playpants/scenes/Event/actions';
import {
  abTestDetailDataSelector,
  defaultToInfoSelector,
  demonwareDetailDataSelector,
  displayExternalEventsSelector,
  displayInfoEventsSelector,
  eventDetailDataSelector,
  eventFetchDetailsSelector,
  externalDetailDataSelector,
  filterPropsDisabledSelector,
} from './selectors';
import * as actions from './actions';
import * as gamertagActions from './components/GamertagSummaryDialog/actions';
import { setStartDate, setEndDate, formatExportParams } from './helpers';
import { SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS } from './constants';
import { useDecoratedEventGroups } from './hooks';

import StatelessScheduleComponent from './presentational';

const ScheduleComponent = props => {
  const [_selectedGamertagGroup, _setSelectedGamertagGroup] = useState({});
  const [_duplicateEventData, _setDuplicateEventData] = useState({});
  const { eventGroups, createEventModalId, gamertagDetailModalId, story } =
    props;

  const currentProject = useSelector(currentProjectSelector, isEqual);
  const dispatch = useDispatch();
  const onCheckStoriesFilterDisabled = useCallback(
    currentProjectId =>
      dispatch(actions.checkStoriesFilterDisabled(currentProjectId)),
    [dispatch]
  );
  useEffect(() => {
    onCheckStoriesFilterDisabled(currentProject.id);
  }, [onCheckStoriesFilterDisabled, currentProject.id]);

  /**
   * Callback that modifies the event - called `modifyEvent`
   * @callback modifyEvent
   * @param {string|number} eventId - ID of the event being modified
   * @param {Object} data           - The updated event
   */
  /**
   * Handles the drag and drop on the calendar by editing start/end times
   * @param {Object} rbcEvent            - Props provided by react big calendar
   * @param {Date} rbcEvent.start        - Dragged event start date
   * @param {Date} rbcEvent.end          - Dragged event end date
   * @param {number} rbcEvent.resourceId - Resource ID
   * @param {boolean} rbcEvent.isAllDay  - Denotes whether dragged event is all day
   * @param {Object} rbcEvent.event      - Details of the selected event
   * @param {modifyEvent} modifyEvent    - Callback that modifies the event
   */
  const handleEventDrop = useCallback(
    ({ end, event, start, isRightClick }, modifyEvent, action) => {
      const { id, event_type: eventType } = event;
      const updatedEvent = { id };
      const reducerGroup =
        eventType === 'event-manager'
          ? SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.EVENT_MANAGER
          : SCHEDULE_COMPONENT_EVENT_REDUCER_GROUPS.INFORMATIONAL;
      if (isEmpty(event.repeat_event_settings)) {
        updatedEvent.publish_at = dateToDefaultTimestamp(start);
        if (event.end_at) {
          if (action === 'move') {
            updatedEvent.end_at = dateToDefaultTimestamp(
              timestampToMoment(
                updatedEvent.publish_at + (event.end_at - event.publish_at)
              ).toDate()
            );
          } else {
            updatedEvent.end_at = dateToDefaultTimestamp(end);
          }
        }
        if (!isRightClick) modifyEvent(event, updatedEvent, reducerGroup, true);
        else _setDuplicateEventData({ end, event, start, action });
      }
    },
    []
  );

  const onFetchEventDetails = useCallback(
    event => dispatch(actions.fetchEventDetails(event)),
    [dispatch]
  );
  const onStoreThenOpenEventDetailModal = useCallback(
    (eventData, openModal) =>
      dispatch(actions.storeThenOpenEventDetailModal(eventData, openModal)),
    [dispatch]
  );
  const onOpenEventDetailModal = useCallback(
    modalId => () => dispatch(ModalHandlers.open(modalId)),
    [dispatch]
  );
  /**
   * Handles the remote open of the event detail modal.
   * For eventManager type events, it fetches the full event info
   * first while loading the modal.  The full event info will be
   * fed to the Event Summary Dialog
   * @param {Object} event - The selected event
   */
  const handleOpenEventDetailModal = useCallback(
    modalId => event => {
      if (event.type === 'eventManager') onFetchEventDetails(event);

      return onStoreThenOpenEventDetailModal(
        event,
        onOpenEventDetailModal(modalId)
      );
    },
    [
      onStoreThenOpenEventDetailModal,
      onOpenEventDetailModal,
      onFetchEventDetails,
    ]
  );

  const onStoreThenOpenABTestDetailModal = useCallback(
    (abTestData, openModal) =>
      dispatch(actions.storeThenOpenABTestDetailModal(abTestData, openModal)),
    [dispatch]
  );
  const onOpenABTestDetailModal = useCallback(
    modalId => () => dispatch(ModalHandlers.open(modalId)),
    [dispatch]
  );
  /**
   * Handles the remote open of the A/B test detail modal
   * @param {Object} event - The selected AB test
   */
  const handleOpenABTestDetailModal = useCallback(
    modalId => event =>
      onStoreThenOpenABTestDetailModal(event, onOpenABTestDetailModal(modalId)),
    [onStoreThenOpenABTestDetailModal, onOpenABTestDetailModal]
  );

  const onStoreThenOpenDemonwareDetailModal = useCallback(
    (data, openModal) =>
      dispatch(actions.storeThenOpenDemonwareDetailModal(data, openModal)),
    [dispatch]
  );
  const onOpenDemonwareDetailModal = useCallback(
    modalId => () => dispatch(ModalHandlers.open(modalId)),
    [dispatch]
  );
  /**
   * Handles the remote open of the demonware event detail modal
   * @param {Object} event - The selected demonware event
   */
  const handleOpenDemonwareDetailModal = useCallback(
    modalId => event =>
      onStoreThenOpenDemonwareDetailModal(
        event,
        onOpenDemonwareDetailModal(modalId)
      ),
    [onStoreThenOpenDemonwareDetailModal, onOpenDemonwareDetailModal]
  );

  const onStoreThenOpenExternalDetailModal = useCallback(
    (data, openModal) =>
      dispatch(actions.storeThenOpenExternalDetailModal(data, openModal)),
    [dispatch]
  );
  const onOpenExternalDetailModal = useCallback(
    modalId => () => dispatch(ModalHandlers.open(modalId)),
    [dispatch]
  );
  /**
   * Handles the remote open of the external event detail modal
   * @param {Object} event - The selected external event
   */
  const handleOpenExternalDetailModal = useCallback(
    modalId => event =>
      onStoreThenOpenExternalDetailModal(
        event,
        onOpenExternalDetailModal(modalId)
      ),
    [onStoreThenOpenExternalDetailModal, onOpenExternalDetailModal]
  );

  const onUpdateCreateFormDefaultDate = useCallback(
    (defaultStartDate, defaultEndDate, isRange) =>
      dispatch(
        actions.updateCreateFormDefaultDate(
          defaultStartDate,
          defaultEndDate,
          isRange
        )
      ),
    [dispatch]
  );
  const onOpenCreateEventModal = useCallback(
    () => dispatch(ModalHandlers.open(createEventModalId)),
    [dispatch, createEventModalId]
  );
  const userTimezone = useSelector(timezoneOrDefaultSelector);
  /**
   * Handles the remote open of the create event modal
   * @param {Object} rbcEventHandler - Event handler
   * @param {number} offset          - Offset of start and end date
   * @param {string} view            - The view type
   */
  const handleOpenCreateEventModal = useCallback(
    (rbcEventHandler, offset, view) => {
      const { action, start: startDate } = rbcEventHandler;
      const currentDate = minMaxDateToMoment('now', userTimezone).toDate();
      const defaultStartDate = setStartDate(
        rbcEventHandler,
        offset,
        view,
        userTimezone
      );
      const defaultEndDate = setEndDate(
        rbcEventHandler,
        offset,
        view,
        userTimezone
      );
      const isRange = action === 'select' && view !== 'month';
      if (
        !startDate ||
        startDate >= currentDate ||
        (view === 'month' &&
          datesAreSameDay(startDate, currentDate, userTimezone))
      ) {
        onUpdateCreateFormDefaultDate(
          defaultStartDate,
          defaultEndDate,
          isRange
        );
        onOpenCreateEventModal(createEventModalId);
      }
    },
    [
      onUpdateCreateFormDefaultDate,
      onOpenCreateEventModal,
      userTimezone,
      createEventModalId,
    ]
  );

  const onExportEvents = useCallback(
    params => dispatch(actions.exportEvents(params)),
    [dispatch]
  );
  const eventsCalendarSettings = useSelector(
    eventsCalendarBaseSelector,
    isEqual
  );
  const affiliatedProjects = useSelector(affiliatedProjectsSelector, isEqual);
  /**
   * Handles exporting events
   */
  const handleExportEvents = useCallback(() => {
    const params = formatExportParams({
      affiliatedProjects,
      eventsCalendarSettings,
      story,
    });
    onExportEvents(params);
  }, [onExportEvents, affiliatedProjects, eventsCalendarSettings, story]);

  const onUpdateGamertagGroup = useCallback(
    (groupId, params) =>
      dispatch(gamertagActions.updateGroupTimewarpSettings(groupId, params)),
    [dispatch]
  );
  /**
   * Handles updating a gamertag group in the calendar
   * when group is dragged and dropped
   */
  const handleGamertagGroupDrop = useCallback(
    ({ group, start }) => {
      const updatedTimewarpSettings = {
        ...group.timewarp_settings,
        ...(group.timewarp_settings.type === 'offset'
          ? {
              time_delta:
                dateToDefaultTimestamp(start) -
                dateToDefaultTimestamp(new Date()),
              date_time: null,
            }
          : { date_time: dateToDefaultTimestamp(start), time_delta: null }),
        isDragDrop: true,
      };
      onUpdateGamertagGroup(group.id, updatedTimewarpSettings);
    },
    [onUpdateGamertagGroup]
  );

  // Decorate eventGroups with handlers and default group props
  const modifyEvent = useCallback(
    (event, data, reducerGroup, isDragDrop = false) => {
      dispatch(actions.updateEvent(event, data, reducerGroup, isDragDrop));
    },
    [dispatch]
  );
  const displayExternalEvents = useSelector(displayExternalEventsSelector);
  const eventFiltersEnabled = useEventFiltersEnabledCheck();
  const displayInfoEvents =
    useSelector(displayInfoEventsSelector) && !eventFiltersEnabled;
  const permissions = useEMPermissionsResult();

  const eventGroupsDecorated = useDecoratedEventGroups(eventGroups, {
    modifyEvent,
    eventDragDrop: handleEventDrop,
    handleOpenEventDetailModal,
    handleOpenDemonwareDetailModal,
    handleOpenExternalDetailModal,
    handleOpenABTestDetailModal,
  });
  const projectSettingsId = useSelector(projectSettingsIdSelector);
  const newProps = {
    ...props,
    eventGroups: eventGroupsDecorated,
    eventsCalendarSettings,
    _abTestDetailData: useSelector(abTestDetailDataSelector, isEqual),
    _affiliatedProjects: affiliatedProjects,
    _baseUrl: useSelector(getBaseURL),
    _currentProject: currentProject,
    _currentUser: useSelector(currentUserSelector, isEqual),
    _defaultToInfo: useSelector(defaultToInfoSelector),
    _demonwareDetailData: useSelector(demonwareDetailDataSelector, isEqual),
    _displayExternalEvents: displayExternalEvents,
    _displayInfoEvents: displayInfoEvents,
    _duplicateEventData,
    _eventDetailData: useSelector(eventDetailDataSelector, isEqual),
    _eventFetchDetails: useSelector(eventFetchDetailsSelector),
    _eventSettings: useSelector(eventSettingsSelector, isEqual),
    _externalDetailData: useSelector(externalDetailDataSelector),
    _filterPropsDisabled: useSelector(filterPropsDisabledSelector),
    _formatDateTime: useSelector(formatDateTimeSelector),
    _gamertagGroupsError: useSelector(scheduleGamertagGroupsErrorSelector),
    _handleExportEvents: handleExportEvents,
    _handleGamertagGroupDrop: handleGamertagGroupDrop,
    _handleOpenCreateEventModal: handleOpenCreateEventModal,
    _platformSettings: useSelector(platformSettingsSelector, isEqual),
    _presetOptions: useSelector(presetOptionsSelector, isEqual),
    _projectSettingsId: projectSettingsId,
    _timeExpired:
      getNowTimestamp() > useSelector(eventDetailDataSelector).publish_at,
    _onOpenGamertagDetailModal: () =>
      dispatch(ModalHandlers.open(gamertagDetailModalId)),
    _onFetchEventDetails: onFetchEventDetails,
    _permissions: permissions,
    _selectedGamertagGroup,
    _setDuplicateEventData,
    _setSelectedGamertagGroup,
    _userTimezone: userTimezone,
    _fetchDroppedEvent: eventId => dispatch(fetchEvent(eventId)),
    _onUpdatePresets: (setting, data) =>
      dispatch(updateProjectSetting(projectSettingsId, setting, data)),
    _onCheckStoriesFilterDisabled: onCheckStoriesFilterDisabled,
    _onClearEventFetchDetails: () => dispatch(actions.clearEventFetchDetails()),
  };

  return <StatelessScheduleComponent {...newProps} />;
};

ScheduleComponent.propTypes = {
  createEventModalId: PropTypes.string.isRequired,
  gamertagDetailModalId: PropTypes.string.isRequired,
  _affiliatedProjects: PropTypes.arrayOf(PropTypes.object),
  story: PropTypes.object,
  eventGroups: PropTypes.array,
};

ScheduleComponent.defaultProps = {
  _affiliatedProjects: undefined,
  story: {},
  eventGroups: [],
};

export default ScheduleComponent;
