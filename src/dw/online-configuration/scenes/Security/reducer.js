import { combineReducers } from 'redux';
import aclReducer from './ACL/reducer';
import anticheatReducer from './Anticheat/reducer';

export default combineReducers({
  Anticheat: anticheatReducer,
  ACL: aclReducer,
});
