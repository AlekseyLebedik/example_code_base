import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import {
  createFetchReducer,
  createUpdateReducer,
} from '@demonware/devzone-core/helpers/reducers';

import * as AT from './actionTypes';

const groupsReducer = createFetchReducer(AT.FETCH_GROUPS);
const clearGroupsReducer = createFetchReducer(AT.CLEAR_GROUPS);

const accountsReducer = createFetchReducer(AT.FETCH_GROUP_ACCOUNTS);
const updateAccountsReducer = createUpdateReducer(AT.UPDATE_GROUP_ACCOUNTS);
const clearAccountsReducer = createFetchReducer(AT.CLEAR_GROUP_ACCOUNTS);

const timewarpSettingsReducer = createFetchReducer(
  AT.FETCH_GROUP_TIMEWARP_SETTINGS
);
const updatetimewarpSettingsReducer = createUpdateReducer(
  AT.UPDATE_GROUP_TIMEWARP_SETTINGS
);
const cleartimewarpSettingsReducer = createFetchReducer(
  AT.CLEAR_GROUP_TIMEWARP_SETTINGS
);

export default combineReducers({
  accounts: reduceReducers(
    accountsReducer,
    updateAccountsReducer,
    clearAccountsReducer
  ),
  groups: reduceReducers(groupsReducer, clearGroupsReducer),
  timewarpSettings: reduceReducers(
    timewarpSettingsReducer,
    updatetimewarpSettingsReducer,
    cleartimewarpSettingsReducer
  ),
});
