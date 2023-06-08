import {
  parseABTests,
  parseDemonwareEvents,
  parseEventListData,
  parseExpyTests,
  parseExternalEvents,
} from 'playpants/helpers/parseEventData';
import findAndReplaceEvent from 'playpants/helpers/findAndReplaceEvent';
import * as AT from './actionTypes';
import { updateGroupListTimewarpSettings } from './helpers';

export const createScheduleEventsReducerFor = scope => {
  const GROUP_INITIAL_STATE = {
    data: [],
    error: null,
    loading: false,
  };

  const SCHEDULE_EVENTS_INITIAL_STATE = {
    abTests: GROUP_INITIAL_STATE,
    demonwareEvents: GROUP_INITIAL_STATE,
    eventManagerEvents: GROUP_INITIAL_STATE,
    expyTests: GROUP_INITIAL_STATE,
    externalEvents: GROUP_INITIAL_STATE,
    informationalEvents: GROUP_INITIAL_STATE,
  };

  return (state = SCHEDULE_EVENTS_INITIAL_STATE, action) => {
    switch (action.type) {
      case scope + AT.FETCH_EVENT_MANAGER_EVENTS:
      case scope + AT.FETCH_EXTERNAL_EVENTS:
      case scope + AT.FETCH_INFORMATIONAL_EVENTS:
      case scope + AT.FETCH_DEMONWARE_EVENTS:
      case scope + AT.FETCH_AB_TESTS:
      case scope + AT.FETCH_EXPY_TESTS: {
        const { reducerGroup } = action;
        return {
          ...state,
          [reducerGroup]: {
            ...state[reducerGroup],
            data: [],
            error: null,
            loading: true,
          },
        };
      }
      case AT.FETCH_APPEND: {
        const { reducerGroup, data = [] } = action;
        const parsedData = data.results.map(event => parseEventListData(event));
        return {
          ...state,
          [reducerGroup]: {
            ...state[reducerGroup],
            data: [...state[reducerGroup].data, ...parsedData],
            loading: true,
          },
        };
      }
      case scope + AT.FETCH_AB_TESTS_SUCCESS: {
        const { reducerGroup, data = [] } = action;
        return {
          ...state,
          [reducerGroup]: {
            ...state[reducerGroup],
            data: parseABTests(data),
            error: null,
            loading: false,
          },
        };
      }
      case scope + AT.FETCH_EXPY_TESTS_SUCCESS: {
        const { reducerGroup, data = [] } = action;
        return {
          ...state,
          [reducerGroup]: {
            ...state[reducerGroup],
            data: parseExpyTests(data),
            error: null,
            loading: false,
          },
        };
      }
      case scope + AT.FETCH_EXTERNAL_EVENTS_SUCCESS: {
        const { reducerGroup, data = [] } = action;
        return {
          ...state,
          [reducerGroup]: {
            ...state[reducerGroup],
            data: parseExternalEvents(data),
            error: null,
            loading: false,
          },
        };
      }
      case scope + AT.FETCH_DEMONWARE_EVENTS_SUCCESS: {
        const { reducerGroup, data = [] } = action;
        return {
          ...state,
          [reducerGroup]: {
            ...state[reducerGroup],
            data: parseDemonwareEvents(data),
            error: null,
            loading: false,
          },
        };
      }
      case scope + AT.FETCH_EVENT_MANAGER_EVENTS_SUCCESS:
      case scope + AT.FETCH_INFORMATIONAL_EVENTS_SUCCESS: {
        const { reducerGroup } = action;
        return {
          ...state,
          [reducerGroup]: {
            ...state[reducerGroup],
            error: null,
            loading: false,
          },
        };
      }
      case scope + AT.FETCH_EVENT_MANAGER_EVENTS_FAILED:
      case scope + AT.FETCH_EXTERNAL_EVENTS_FAILED:
      case scope + AT.FETCH_INFORMATIONAL_EVENTS_FAILED:
      case scope + AT.FETCH_DEMONWARE_EVENTS_FAILED:
      case scope + AT.FETCH_AB_TESTS_FAILED:
      case scope + AT.FETCH_EXPY_TESTS_FAILED: {
        const { reducerGroup, error } = action;
        return {
          ...state,
          [reducerGroup]: {
            data: [],
            error,
            loading: false,
          },
        };
      }
      case AT.UPDATE_EVENT: {
        const { data, event, isDragDrop, reducerGroup } = action;
        if (isDragDrop && state[reducerGroup] && state[reducerGroup].data) {
          const updatedEvent = {
            ...event,
            publish_at: data.publish_at,
            end_at: data.end_at ? data.end_at : event.end_at,
          };
          return {
            ...state,
            [reducerGroup]: {
              ...state[reducerGroup],
              data: findAndReplaceEvent(state[reducerGroup].data, updatedEvent),
              error: null,
            },
          };
        }
        return state;
      }
      case AT.UPDATE_EVENT_SUCCESS: {
        const { reducerGroup } = action;
        return {
          ...state,
          [reducerGroup]: {
            ...state[reducerGroup],
            data: findAndReplaceEvent(state[reducerGroup].data, action.event),
            error: null,
          },
        };
      }
      case AT.UPDATE_EVENT_FAILED: {
        const { error, event, isDragDrop, reducerGroup } = action;
        if (isDragDrop && state[reducerGroup] && state[reducerGroup].data) {
          return {
            ...state,
            [reducerGroup]: {
              ...state[reducerGroup],
              data: findAndReplaceEvent(state[reducerGroup].data, event),
              error,
            },
          };
        }
        return state;
      }
      default:
        return state;
    }
  };
};

export const INITIAL_STATE = {
  data: [],
  nextPageToken: undefined,
  next: undefined,
  params: undefined,
  error: false,
  loading: false,
};

export const createUpdateGroupListTimewarpSettingsReducer =
  actionTypePrefix =>
  (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case `${actionTypePrefix}.UPDATE_GROUP_TIMEWARP_SETTINGS_UPDATE`: {
        if (action.params.isDragDrop) {
          const dragDroppedGroup = state.data.find(
            group => group.timewarp_settings.id === action.params.id
          );
          const updatedTimewarpSettings = { ...action.params };
          delete updatedTimewarpSettings.isDragDrop;
          return {
            ...state,
            data: updateGroupListTimewarpSettings(
              state.data,
              updatedTimewarpSettings
            ),
            error: null,
            oldTimewarpSettings:
              dragDroppedGroup && dragDroppedGroup.timewarp_settings,
          };
        }
        return state;
      }
      case `${actionTypePrefix}.UPDATE_GROUP_TIMEWARP_SETTINGS_UPDATE_SUCCESS`: {
        return {
          ...state,
          data: updateGroupListTimewarpSettings(state.data, action.data),
          error: null,
          oldTimewarpSettings: null,
        };
      }
      case `${actionTypePrefix}.UPDATE_GROUP_TIMEWARP_SETTINGS_UPDATE_FAILED`: {
        return {
          ...state,
          data: state.oldTimewarpSettings
            ? updateGroupListTimewarpSettings(
                state.data,
                state.oldTimewarpSettings
              )
            : state.data,
          error: action.error,
          oldTimewarpSettings: null,
        };
      }
      default:
        return state;
    }
  };
