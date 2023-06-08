import { combineReducers } from 'redux';
import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';

import * as AT from './actionTypes';

const LOGIN_QUEUE_STATUS_INITIAL_STATE = {
  data: {},
  nextPageToken: undefined,
  next: undefined,
  params: undefined,
  error: false,
  loading: false,
};

const loginQueueStatusFetchReducer = createFetchReducer(AT.LOGIN_QUEUE_STATUS, {
  INITIAL_STATE: LOGIN_QUEUE_STATUS_INITIAL_STATE,
});

const loginQueueVIPListFetchReducer = createFetchReducer(
  AT.LOGIN_QUEUE_VIP_LIST
);

const queueSettingsPutReducer = (state = { error: undefined }, action) => {
  switch (action.type) {
    case AT.LOGIN_QUEUE_SPECIFIC_SETTINGS_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case AT.LOGIN_QUEUE_SPECIFIC_SETTINGS_SUCCESS:
      return {
        ...state,
        error: undefined,
      };
    case `${AT.LOGIN_QUEUE_STATUS}_FETCH_SUCCESS`:
      return {
        ...state,
        error: undefined,
      };
    default:
      return state;
  }
};

const titleSettingsPutReducer = (state = { error: undefined }, action) => {
  switch (action.type) {
    case AT.LOGIN_QUEUE_TITLE_SETTINGS_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case AT.LOGIN_QUEUE_TITLE_SETTINGS_SUCCESS:
      return {
        ...state,
        error: undefined,
      };
    case `${AT.LOGIN_QUEUE_STATUS}_FETCH_SUCCESS`:
      return {
        ...state,
        error: undefined,
      };
    default:
      return state;
  }
};

const loginQueueVIPListPatchReducer = (
  state = { error: undefined, updating: false },
  action
) => {
  switch (action.type) {
    case AT.LOGIN_QUEUE_VIP_LIST:
      return {
        ...state,
        updating: true,
      };
    case AT.LOGIN_QUEUE_VIP_LIST_FAILED:
      return {
        ...state,
        error: action.error,
        updating: false,
      };
    case AT.LOGIN_QUEUE_VIP_LIST_SUCCESS:
      return {
        ...state,
        error: undefined,
        updating: false,
      };
    case `${AT.LOGIN_QUEUE_VIP_LIST}_FETCH_SUCCESS`:
      return {
        ...state,
        error: undefined,
        updating: false,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  queueStatus: loginQueueStatusFetchReducer,
  queueVIPList: loginQueueVIPListFetchReducer,
  queueSettingsUpdate: queueSettingsPutReducer,
  titleSettingsUpdate: titleSettingsPutReducer,
  queueVIPListUpdate: loginQueueVIPListPatchReducer,
});

export default reducer;
