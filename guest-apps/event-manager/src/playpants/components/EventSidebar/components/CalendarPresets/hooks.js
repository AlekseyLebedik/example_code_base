import { useEffect, useRef, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import queryString from 'query-string';
import moment from 'moment';
import isEqual from 'lodash/isEqual';

import {
  filterIgnoredPresetSettings,
  getLocalStorage,
  setLocalStorage,
} from 'dw/core/components/EventsCalendar/helpers';
import { currentProjectSelector } from 'playpants/components/App/components/ProjectSelector/selectors';
import {
  LOCAL_STORAGE_CALENDAR_SETTINGS,
  LOCAL_STORAGE_PRESETS,
} from 'dw/core/components/EventsCalendar/constants';

export const useCalendarPresets = () => {
  const settingsRef = useRef();
  const locationRef = useRef();
  const history = useHistory();
  const { id: currentProjectId } = useSelector(currentProjectSelector, isEqual);
  const calendarSettings = useSelector(
    state => state.Core.EventsCalendar,
    isEqual
  );
  useEffect(() => {
    settingsRef.current = calendarSettings;
  }, [calendarSettings]);
  useEffect(() => {
    locationRef.current = history.location;
  }, [history.location]);

  const storedValues = useMemo(() => {
    const rawValue = getLocalStorage(LOCAL_STORAGE_PRESETS, currentProjectId);
    return rawValue ? JSON.parse(rawValue) : rawValue;
  }, [currentProjectId]);
  const storedSettings = useMemo(() => {
    const rawValue = getLocalStorage(
      LOCAL_STORAGE_CALENDAR_SETTINGS,
      currentProjectId
    );
    return rawValue ? JSON.parse(rawValue) : rawValue;
  }, [currentProjectId]);
  const saveCalendarSettings = () => {
    let numberOfDays;
    const query = queryString.parse(locationRef.current.search);
    if (query.defaultTimeStart && query.defaultTimeEnd) {
      numberOfDays = Math.ceil(
        moment
          .duration(
            parseInt(query.defaultTimeEnd, 10) -
              parseInt(query.defaultTimeStart, 10)
          )
          .asDays()
      );
    }
    const filteredSettings = filterIgnoredPresetSettings(settingsRef.current);
    setLocalStorage(LOCAL_STORAGE_CALENDAR_SETTINGS, currentProjectId, {
      ...filteredSettings,
      numberOfDays,
    });
  };
  // eslint-disable-next-line
  useEffect(() => () => saveCalendarSettings(), []);
  const presets = useMemo(() => {
    if (storedSettings) return storedSettings;
    if (storedValues) return JSON.parse(storedValues.path);
    return {};
  }, [storedSettings, storedValues]);
  return presets;
};
