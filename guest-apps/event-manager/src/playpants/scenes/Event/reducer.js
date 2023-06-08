import { parseEventData } from 'playpants/helpers/parseEventData';
import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import isEmpty from 'lodash/isEmpty';

import {
  createFetchReducer,
  createUpdateReducer,
  INITIAL_STATE as FETCH_INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';
import {
  reducer as activitiesReducer,
  INITIAL_STATE as ACTIVITIES_INITIAL_STATE,
} from './components/Activities/reducer';
import {
  reducer as conflictsReducer,
  INITIAL_STATE as CONFLICTS_INITIAL_STATE,
} from './components/Conflicts/reducer';
import { reducer as historyReducer } from './components/HistoryLog/reducer';
import taskMonitorReducer from './components/TaskMonitor/reducer';
import * as AT from './actionTypes';

const discussionFetchReducer = createFetchReducer(AT.DISCUSSION_FETCH);
const userResponsibilitiesFetchReducer = createFetchReducer(
  AT.FETCH_USER_RESPONSIBILITIES
);
const eventFetchReducer = createFetchReducer(AT.EVENT_FETCH);
const eventUpdateReducer = createUpdateReducer(AT.UPDATE_EVENT);
const authsUpdateReducer = createUpdateReducer(AT.UPDATE_AUTHS);
const eventDeleteReducer = createUpdateReducer(AT.DELETE_EVENT);

const EVENT_INITIAL_STATE = {
  ...FETCH_INITIAL_STATE,
  data: {},
};

const eventReducer = (state = EVENT_INITIAL_STATE, action) => {
  switch (action.type) {
    case `${AT.EVENT_FETCH}_FETCH`:
    case `${AT.EVENT_FETCH}_FETCH_SUCCESS`:
    case `${AT.EVENT_FETCH}_FETCH_FAILED`:
      return {
        ...state,
        ...eventFetchReducer(state, action),
        data: action.data ? parseEventData(action.data) : state.data,
      };
    case `${AT.UPDATE_EVENT}_UPDATE`:
    case `${AT.UPDATE_EVENT}_UPDATE_SUCCESS`:
    case `${AT.UPDATE_EVENT}_UPDATE_FAILED`:
      return {
        ...state,
        ...eventUpdateReducer(state, action),
        data: !isEmpty(action.data) ? parseEventData(action.data) : state.data,
      };
    default:
      return {
        ...state,
        ...eventDeleteReducer(state, action),
        ...authsUpdateReducer(state, action),
      };
  }
};

export const INITIAL_STATE = {
  event: EVENT_INITIAL_STATE,
  discussion: FETCH_INITIAL_STATE,
  activity: ACTIVITIES_INITIAL_STATE,
  conflicts: CONFLICTS_INITIAL_STATE,
};

const clearReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CLEAR_EVENT_STORE:
      return {
        ...INITIAL_STATE,
      };
    default:
      return {
        ...state,
      };
  }
};

const reducer = reduceReducers(
  clearReducer,
  combineReducers({
    event: eventReducer,
    discussion: discussionFetchReducer,
    activity: activitiesReducer,
    conflicts: conflictsReducer,
    history: historyReducer,
    responsibilities: userResponsibilitiesFetchReducer,
    taskMonitor: taskMonitorReducer,
  })
);

export default reducer;
