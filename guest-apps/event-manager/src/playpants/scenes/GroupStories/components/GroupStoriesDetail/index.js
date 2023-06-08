import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ScheduleComponent from 'playpants/components/ScheduleComponent';
import { currentProjectSelector } from 'playpants/components/App/selectors';
import { infoEventTypesSelector } from 'playpants/components/ScheduleComponent/selectors';
import { selectedGroupStorySelector } from 'playpants/scenes/GroupStories/selectors';
import {
  useEventFiltersEnabledCheck,
  useInformationalEventsEnabledCheck,
  useEventManagerEventsEnabledCheck,
} from 'playpants/components/EventFilters/hooks';

import * as actions from './actions';
import * as selectors from './selectors';
import { CREATE_STORY_EVENT_FORM } from './constants';
import { useGroupStoriesEventGroups } from './hooks';

export const GroupStoriesDetailBase = () => {
  const currentProject = useSelector(currentProjectSelector);
  const selectedGroupStory = useSelector(selectedGroupStorySelector);
  const infoTypes = useSelector(infoEventTypesSelector);
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
          story: selectedGroupStory.id,
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
      selectedGroupStory.id,
    ]
  );

  const onResetGroupStoriesDetail = useCallback(
    () => dispatch(actions.resetGroupStoriesDetail()),
    [dispatch]
  );
  useEffect(() => {
    handleFetchEvents(['eventManager', 'informationalEvents']);
  }, [currentProject.id, selectedGroupStory, handleFetchEvents]);
  useEffect(
    () => () => {
      onResetGroupStoriesDetail();
    },
    [onResetGroupStoriesDetail]
  );
  const eventGroups = useGroupStoriesEventGroups();
  const eventLoading = useSelector(selectors.eventsLoadingSelector);
  const eventError = useSelector(selectors.eventsErrorSelector);

  return (
    <ScheduleComponent
      createEventModalId={CREATE_STORY_EVENT_FORM}
      eventGroups={eventGroups}
      eventLoading={eventLoading}
      eventError={eventError}
      onFetchEvents={handleFetchEvents}
      initialValues={{ story: selectedGroupStory.id }}
    />
  );
};

export default GroupStoriesDetailBase;
