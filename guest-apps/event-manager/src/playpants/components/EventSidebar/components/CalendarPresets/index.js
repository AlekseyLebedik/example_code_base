import React, {
  useCallback,
  useState,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import capitalize from 'lodash/capitalize';
import toLower from 'lodash/toLower';
import isEqual from 'lodash/isEqual';
import CreatableSelect from 'react-select/creatable';
import { useSelector } from 'react-redux';

import {
  filterIgnoredPresetSettings,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from 'dw/core/components/EventsCalendar/helpers';
import {
  LOCAL_STORAGE_CALENDAR_SETTINGS,
  LOCAL_STORAGE_PRESETS,
  CALENDAR_PRESETS_SETTINGS,
} from 'dw/core/components/EventsCalendar/constants';

import OptionLabel from './components/OptionLabel';

const CalendarPresets = ({
  adminUser,
  onPresetsUpdate,
  presetOptions,
  projectId,
  setCalendarSettings,
}) => {
  const eventsCalendarSettings = useSelector(
    state => state.Core.EventsCalendar,
    isEqual
  );
  const selectRef = useRef(null);
  const [inputValue, setInputValue] = useState();
  const [open, setOpen] = useState(false);
  const [stayOpen, setStayOpen] = useState(false);

  const storedValues = useMemo(
    () => getLocalStorage(LOCAL_STORAGE_PRESETS, projectId),
    [projectId]
  );
  const storedSettings = useMemo(
    () => getLocalStorage(LOCAL_STORAGE_CALENDAR_SETTINGS, projectId),
    [projectId]
  );
  const savedPreset = useMemo(
    () => (storedValues ? JSON.parse(storedValues) : {}),
    [storedValues]
  );

  // Display custom preset when user changes to calendar settings differ from preset
  useEffect(() => {
    setInputValue(savedPreset.path === storedSettings ? savedPreset : null);
  }, [eventsCalendarSettings, setInputValue, storedSettings, savedPreset]);

  // Focus on the react-select to return to native event
  const focusCreatable = useCallback(() => selectRef.current.focus(), []);

  // Override select on close to persist while focus is on edit textfields
  const handleSelectClose = useCallback(() => {
    if (stayOpen) setOpen(true);
    else setOpen(false);
  }, [stayOpen]);

  // Generate a preset to append to project settings
  const handleCreate = useCallback(
    preset => {
      const settings = filterIgnoredPresetSettings(eventsCalendarSettings);
      const version = eventsCalendarSettings.calendarSettingsVersion;
      const newPreset = { ...preset, path: JSON.stringify(settings), version };
      onPresetsUpdate(CALENDAR_PRESETS_SETTINGS, [...presetOptions, newPreset]);
      setLocalStorage(LOCAL_STORAGE_PRESETS, projectId, newPreset);
      setInputValue(newPreset);
    },
    [eventsCalendarSettings, onPresetsUpdate, presetOptions, projectId]
  );

  // Remove preset from project settings and empty local storage if selected
  const handleRemove = useCallback(
    ({ value }) => {
      if (savedPreset && savedPreset.value === value)
        removeLocalStorage(LOCAL_STORAGE_PRESETS, projectId);
      const { value: selectValue } = selectRef.current.state;
      if (selectValue && selectValue.value === value) setInputValue('');
      const presets = presetOptions.filter(p => p.value !== value);
      onPresetsUpdate(CALENDAR_PRESETS_SETTINGS, presets);
      setOpen(true);
    },
    [onPresetsUpdate, projectId, presetOptions, savedPreset]
  );

  // Edit preset label and reassign value key to avoid duplicates
  const handleUpdate = useCallback(
    ({ value, label }) => {
      if (savedPreset.value === value) {
        const newValueObj = {
          ...presetOptions.find(p => p.value === value),
          value: toLower(label),
          label,
        };
        setLocalStorage(LOCAL_STORAGE_PRESETS, projectId, newValueObj);
      }
      const presets = presetOptions.map(p =>
        p.value === value ? { ...p, value: toLower(label), label } : p
      );
      onPresetsUpdate(CALENDAR_PRESETS_SETTINGS, presets);
    },
    [savedPreset, presetOptions, projectId, onPresetsUpdate]
  );

  // Overrides select field changes used to clear, create, and select presets
  const handleChange = useCallback(
    (newValue, actionMeta) => {
      const { value, label } = newValue || {};
      switch (actionMeta.action) {
        case 'select-option': {
          const newValueObj = presetOptions.find(p => p.value === value);
          setInputValue(newValueObj);
          setLocalStorage(LOCAL_STORAGE_PRESETS, projectId, newValueObj);
          setCalendarSettings(JSON.parse(newValueObj.path));
          setOpen(false);
          break;
        }
        case 'create-option': {
          const newValueObj = { value, label: capitalize(label) };
          handleCreate(newValueObj);
          break;
        }
        case 'clear':
          setInputValue('');
          break;
        default:
          break;
      }
    },
    [presetOptions, projectId, setCalendarSettings, handleCreate]
  );

  // Override valid new option check to add admin permission check
  const newOptionCheck = useCallback(
    (input, _, selectOptions) => {
      if (input && adminUser) {
        return !selectOptions.some(
          v => v.value.toLowerCase() === input.toLowerCase()
        );
      }
      return false;
    },
    [adminUser]
  );

  const options = useMemo(
    () =>
      presetOptions.map(({ value, label, path }) => ({
        value,
        path,
        label: (
          <OptionLabel
            adminUser={adminUser}
            focusCreatable={focusCreatable}
            label={label}
            removePresetOption={handleRemove}
            savedPreset={savedPreset}
            setStayOpen={setStayOpen}
            updatePresetOption={handleUpdate}
            value={value}
          />
        ),
      })),
    [
      presetOptions,
      adminUser,
      savedPreset,
      focusCreatable,
      handleUpdate,
      handleRemove,
    ]
  );

  return (
    <CreatableSelect
      isClearable
      key={options.length}
      placeholder="Save filter"
      menuIsOpen={open}
      onChange={handleChange}
      onMenuClose={handleSelectClose}
      onMenuOpen={setOpen}
      options={options}
      ref={selectRef}
      value={inputValue}
      isValidNewOption={newOptionCheck}
    />
  );
};

CalendarPresets.propTypes = {
  adminUser: PropTypes.bool.isRequired,
  onPresetsUpdate: PropTypes.func.isRequired,
  presetOptions: PropTypes.arrayOf(PropTypes.object),
  projectId: PropTypes.string.isRequired,
  setCalendarSettings: PropTypes.func.isRequired,
};
CalendarPresets.defaultProps = {
  presetOptions: [],
};

export default CalendarPresets;
