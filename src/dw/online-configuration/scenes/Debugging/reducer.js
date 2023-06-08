import { combineReducers } from 'redux';
import callSearchReducer from './CallSearch/reducer';
import { reducer as serverLogsReducer } from './ServerLogs/reducer';

export const reducer = combineReducers({
  CallSearch: callSearchReducer,
  ServerLogs: serverLogsReducer,
});
