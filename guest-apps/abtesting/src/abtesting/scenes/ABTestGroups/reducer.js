import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import {
  createFetchReducer,
  INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';
import {
  GROUPS_LIST_PREFIX,
  GROUPS_DETAILS_PREFIX,
  GROUPS_DETAILS_TESTS_PREFIX,
  GROUPS_DETAILS_CONFIGS_PREFIX,
} from './constants';

const DETAILS_INITIAL_STATE = {
  loading: false,
  members: [],
};

const fetchGroupsReducer = createFetchReducer(GROUPS_LIST_PREFIX);
const fetchTestsReducer = createFetchReducer(GROUPS_DETAILS_TESTS_PREFIX);
const fetchConfigsReducer = createFetchReducer(GROUPS_DETAILS_CONFIGS_PREFIX);

const groupDetailsReducer = (state = DETAILS_INITIAL_STATE, action) => {
  switch (action.type) {
    case `${GROUPS_DETAILS_PREFIX}_FETCH`: {
      return {
        ...state,
        loading: true,
        groupID: action.params.groupID,
        members: [],
      };
    }
    case `${GROUPS_DETAILS_PREFIX}_FETCH_SUCCESS`:
      return state.groupID === action.data.groupID
        ? {
            ...state,
            ...action.data,
            loading: false,
          }
        : state;
    case `${GROUPS_DETAILS_PREFIX}_FETCH_FAILED`:
      return {
        ...state,
        loading: false,
      };
    case `${GROUPS_DETAILS_PREFIX}_ADD_GROUP_MEMBER_SUCCESS`: {
      const userIds = state.members.map(user => user.userID);
      const users = action.user.filter(user => !userIds.includes(user.userID));
      return state.groupID === action.groupID && users.length > 0
        ? {
            ...state,
            members: [...users, ...state.members],
          }
        : state;
    }
    case `${GROUPS_DETAILS_PREFIX}_REMOVE_GROUP_MEMBERS_SUCCESS`: {
      const ids = action.users.map(u => u.userID);
      return state.groupID === action.groupID &&
        state.members.some(u => ids.includes(u.userID))
        ? {
            ...state,
            members: state.members.filter(u => !ids.includes(u.userID)),
          }
        : state;
    }
    default:
      return state;
  }
};

const deleteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${GROUPS_LIST_PREFIX}_DELETE_GROUP_SUCCESS`: {
      return {
        ...state,
        data: action.group
          ? state.data.filter(item => item !== action.group)
          : state.data,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default combineReducers({
  groups: reduceReducers(fetchGroupsReducer, deleteReducer, INITIAL_STATE),
  groupDetails: groupDetailsReducer,
  tests: fetchTestsReducer,
  configs: fetchConfigsReducer,
});
