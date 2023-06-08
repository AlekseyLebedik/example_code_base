import moment from 'moment-timezone';

import * as AT from './actionTypes';

const INITIAL_STATE = {
  calendarSettingsVersion: 1,
  customViewOn: true,
  datePickerProps: null,
  displayView: 'calendar',
  eventTimeOffset: 0,
  filters: {
    customTags: {
      userTags: {},
      unspecified: true,
    },
    environments: {
      Development: true,
      Certification: true,
      Live: true,
      'Cross Environment': true,
    },
    gamertags: {},
    platforms: {},
    projects: {},
    sources: {},
    stories: {
      Group: true,
      Timewarp: true,
      None: true,
    },
  },
  groupLoadingStatuses: {},
  numberOfDays: moment().daysInMonth(),
  selectedDay: moment().unix(),
  selectedStyle: 'sources',
  selectedView: 'month',
  sidebarHovering: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AT.SET_EVENTS_CALENDAR_SETTINGS: {
      return {
        ...state,
        ...action.calendarSettings,
      };
    }
    case AT.CLEAR_EVENTS_CALENDAR_SETTINGS:
      return {
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
}
