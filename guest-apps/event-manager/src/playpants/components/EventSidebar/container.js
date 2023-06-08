import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { useEMPermissionsResult } from 'playpants/hooks';
import {
  presetOptionsSelector,
  currentProjectSelector,
  projectSettingsIdSelector,
} from 'playpants/components/App/selectors';
import { filterPropsDisabledSelector } from 'playpants/components/ScheduleComponent/selectors';
import { setEventsCalendarSettings } from 'dw/core/components/EventsCalendar/actions';
import {
  filterIgnoredPresetSettings,
  setLocalStorage,
} from 'dw/core/components/EventsCalendar/helpers';
import { LOCAL_STORAGE_CALENDAR_SETTINGS } from 'dw/core/components/EventsCalendar/constants';

import { updateProjectSetting } from 'playpants/scenes/ProjectSettings/actions';

import EventsSidebarStateless from './presentational';

export const EventsSidebar = props => {
  const dispatch = useDispatch();

  const presetOptions = useSelector(presetOptionsSelector, isEqual);
  const currentProject = useSelector(currentProjectSelector, isEqual);
  const { id: projectId } = currentProject;
  const disabledFilters = useSelector(filterPropsDisabledSelector, isEqual);
  const permissions = useEMPermissionsResult();

  const projectSettingsId = useSelector(projectSettingsIdSelector);
  const onPresetsUpdate = useCallback(
    (setting, data) =>
      dispatch(updateProjectSetting(projectSettingsId, setting, data)),
    [dispatch, projectSettingsId]
  );

  const eventsCalendarSettings = useSelector(
    state => state.Core.EventsCalendar,
    isEqual
  );
  const setCalendarPresetSettings = useCallback(
    newSettings => {
      const storedSettings = {
        ...eventsCalendarSettings,
        ...newSettings,
      };
      const filteredSettings = filterIgnoredPresetSettings(storedSettings);
      setLocalStorage(
        LOCAL_STORAGE_CALENDAR_SETTINGS,
        projectId,
        filteredSettings
      );
    },
    [eventsCalendarSettings, projectId]
  );
  const setCalendarSettings = useCallback(
    calendarSettings => {
      setCalendarPresetSettings(calendarSettings);
      dispatch(setEventsCalendarSettings(calendarSettings));
    },
    [dispatch, setCalendarPresetSettings]
  );
  const newProps = {
    presetOptions,
    currentProject,
    disabledFilters,
    onPresetsUpdate,
    setCalendarSettings,
    permissions,
    ...props,
  };

  return <EventsSidebarStateless {...newProps} />;
};

export default EventsSidebar;
