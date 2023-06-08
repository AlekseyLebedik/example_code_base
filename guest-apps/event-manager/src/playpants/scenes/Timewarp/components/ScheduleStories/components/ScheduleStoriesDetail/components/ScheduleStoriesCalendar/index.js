import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import {
  useEventFiltersEnabledCheck,
  useInformationalEventsEnabledCheck,
  useEventManagerEventsEnabledCheck,
} from 'playpants/components/EventFilters/hooks';
import ScheduleComponent from 'playpants/components/ScheduleComponent';
import { currentProjectSelector } from 'playpants/components/App/selectors';
import { infoEventTypesSelector } from 'playpants/components/ScheduleComponent/selectors';
import { selectedScheduleStorySelector } from 'playpants/scenes/Timewarp/components/ScheduleStories/selectors';
import { makeIsSafeSelector } from '../Details/selectors';

import { SCHEDULE_STORIES_CREATE_EVENT_FORM } from './constants';
import * as selectors from './selectors';
import * as actions from './actions';
import { useScheduleEventGroups } from './hooks';

const ScheduleStoriesCalendar = props => {
  const { allowDetachedEvents, detachedSchedule } = props;
  const currentProject = useSelector(currentProjectSelector);
  const infoTypes = useSelector(infoEventTypesSelector);
  const selectedScheduleStory = useSelector(selectedScheduleStorySelector);
  const dispatch = useDispatch();
  const onFetchEventManagerEvents = useCallback(
    params => dispatch(actions.fetchEventManagerEvents(params)),
    [dispatch]
  );
  const onFetchInformationalEvents = useCallback(
    params => dispatch(actions.fetchInformationalEvents(params)),
    [dispatch]
  );
  const eventFiltersEnabled = useEventFiltersEnabledCheck();
  const informationalEventsEnabled = useInformationalEventsEnabledCheck();
  const eventManagerEventsEnabled = useEventManagerEventsEnabledCheck();
  const handleFetchEvents = useCallback(
    groups => {
      groups.forEach(group => {
        const params = {
          project: currentProject.id,
          story: selectedScheduleStory.id,
        };
        switch (group) {
          case 'eventManager':
            if (!eventFiltersEnabled || eventManagerEventsEnabled) {
              params.event_type = 'event-manager';
              onFetchEventManagerEvents(params);
            }
            break;
          case 'informationalEvents':
            if (!eventFiltersEnabled || informationalEventsEnabled) {
              params.event_type__in = infoTypes.toString();
              onFetchInformationalEvents(params);
            }
            break;
          default:
            break;
        }
      });
    },
    [
      currentProject.id,
      infoTypes,
      onFetchEventManagerEvents,
      onFetchInformationalEvents,
      selectedScheduleStory.id,
    ]
  );

  useEffect(() => {
    handleFetchEvents(['eventManager', 'informationalEvents']);
  }, [currentProject.id, selectedScheduleStory, handleFetchEvents]);

  const onResetScheduleStoriesCalendar = useCallback(
    () => dispatch(actions.resetScheduleStoriesCalendar),
    [dispatch]
  );
  useEffect(
    () => () => {
      onResetScheduleStoriesCalendar();
    },
    [onResetScheduleStoriesCalendar]
  );

  const isSafeSelector = makeIsSafeSelector(detachedSchedule);
  const eventEnvType = useSelector(selectors.eventEnvTypeSelector);
  const isSafe = useSelector(isSafeSelector);
  const eventLoading = useSelector(selectors.eventsLoadingSelector);
  const eventError = useSelector(selectors.eventsErrorSelector);

  const eventGroups = useScheduleEventGroups();
  return (
    <ScheduleComponent
      {...(allowDetachedEvents &&
        isSafe.toEditSchedule && {
          createEventModalId: SCHEDULE_STORIES_CREATE_EVENT_FORM,
        })}
      detachedSchedule={detachedSchedule}
      eventGroups={eventGroups}
      eventLoading={eventLoading}
      eventError={eventError}
      initialValues={{
        eventEnvType,
        isSchedule: true,
        schedule: selectedScheduleStory.schedule,
        story: selectedScheduleStory.id,
      }}
      onFetchEvents={handleFetchEvents}
      storyId={selectedScheduleStory}
    />
  );
};

ScheduleStoriesCalendar.propTypes = {
  allowDetachedEvents: PropTypes.bool.isRequired,
  currentProject: PropTypes.object.isRequired,
  detachedSchedule: PropTypes.bool.isRequired,
  eventEnvType: PropTypes.string.isRequired,
};

export default ScheduleStoriesCalendar;
