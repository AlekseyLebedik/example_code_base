import { combineReducers } from 'redux';
import connectionLogsReducer from './ConnectionLogs/reducer';
import ipControlReducer from './IPControl/reducer';

export default combineReducers({
  ConnectionLogs: connectionLogsReducer,
  IPControl: ipControlReducer,
});
