import { combineReducers } from 'redux';
import groupMembersReducer from './GroupMembers/reducer';
import variablesSetsReducer from './VariablesSets/reducer';

export default combineReducers({
  GroupMembers: groupMembersReducer,
  VariablesSets: variablesSetsReducer,
});
