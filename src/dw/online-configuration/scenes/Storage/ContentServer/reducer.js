import { combineReducers } from 'redux';
import { reducer as pooledFilesReducer } from './PooledFiles/reducer';
import { reducer as userFilesReducer } from './UserFiles/reducer';
import { reducer as quotaAllowanceReducer } from './QuotaAllowance/reducer';
import { reducer as quotaUsageReducer } from './QuotaUsage/reducer';

export const reducer = combineReducers({
  PooledFiles: pooledFilesReducer,
  UserFiles: userFilesReducer,
  QuotaAllowance: quotaAllowanceReducer,
  QuotaUsage: quotaUsageReducer,
});
