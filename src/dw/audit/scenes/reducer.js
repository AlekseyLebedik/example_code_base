import { combineReducers } from 'redux';
import { reducer as auditLogsReducer } from './AuditLogs/reducer';

const reducer = combineReducers({
  AuditLogs: auditLogsReducer,
});

export default reducer;
