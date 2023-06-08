import { combineReducers } from 'redux';
import uniqBy from 'lodash/uniqBy';
import reduceReducers from 'reduce-reducers';

import {
  createScheduleEventsReducerFor,
  createUpdateGroupListTimewarpSettingsReducer,
} from 'playpants/components/ScheduleComponent/reducerCreators';

import { prefix as gamertagPrefix } from 'playpants/components/ScheduleComponent/components/GamertagSummaryDialog/actions';
import { InitialState, Action } from 'playpants/types/state';

import { SCOPE, FETCH_GAMERTAG_GROUPS } from './actionTypes';

const INITIAL_STATE: InitialState = {
  data: [],
  nextPageToken: undefined,
  next: undefined,
  params: undefined,
  error: false,
  loading: false,
};

const gamertagGroupsReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case `${FETCH_GAMERTAG_GROUPS}_FETCH`:
      return {
        ...state,
        data: action.append ? state.data : [],
        params: action.params,
        loading: true,
      };
    case `${FETCH_GAMERTAG_GROUPS}_FETCH_SUCCESS`:
      return {
        ...state,
        data: action.append
          ? uniqBy([...state.data, ...action.data], 'id')
          : action.data,
        nextPageToken: action.nextPageToken,
        next: action.next,
        loading: false,
      };
    case `${FETCH_GAMERTAG_GROUPS}_FETCH_FAILED`:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

const events = createScheduleEventsReducerFor(SCOPE);
const updateGamertagGroupTimewarpSettings =
  createUpdateGroupListTimewarpSettingsReducer(gamertagPrefix);

export default combineReducers({
  events,
  gamertagGroups: reduceReducers(
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    INITIAL_STATE,
    gamertagGroupsReducer,
    updateGamertagGroupTimewarpSettings
  ),
});
