import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import {
  createFetchReducer,
  INITIAL_STATE as FETCH_INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';

import * as AT from './actionTypes';

const assignedGroupsReducer = (state = FETCH_INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ADD_USER_SUCCESS:
      return {
        ...state,
        data: action.groups.map(keys => ({ ...keys })),
      };
    default:
      return state;
  }
};

const assignedGroupsReducedReducer = reduceReducers(
  FETCH_INITIAL_STATE,
  createFetchReducer(AT.FETCH_ASSIGNED_GROUPS),
  assignedGroupsReducer
);

const reducer = combineReducers({
  assignedGroups: assignedGroupsReducedReducer,
});

export default reducer;
