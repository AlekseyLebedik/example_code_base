import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import { updateReducer } from 'playpants/scenes/ProjectSettings/reducerCreators';

import responsibilitiesGroupsReducer from './components/Groups/reducer';
import responsibilitiesUsersReducer from './components/Users/reducer';

import * as AT from './actionTypes';

const groupsReducer = createFetchReducer(AT.FETCH_GROUP_LIST);
const responsibilityOptionsReducer = createFetchReducer(
  AT.FETCH_RESPONSIBILITY_OPTIONS
);
const responsibilityGroupsReducer = createFetchReducer(
  AT.FETCH_RESPONSIBILITY_GROUPS
);

export default combineReducers({
  groups: groupsReducer,
  responsibilityOptions: responsibilityOptionsReducer,
  responsibilityGroups: reduceReducers(
    responsibilityGroupsReducer,
    updateReducer(AT.CREATE_RESPONSIBILITY_GROUPS, true)
  ),
  group: responsibilitiesGroupsReducer,
  user: responsibilitiesUsersReducer,
});
