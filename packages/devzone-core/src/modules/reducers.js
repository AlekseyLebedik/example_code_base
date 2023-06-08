import { combineReducers } from 'redux';

import userReducer, { INITIAL_STATE as userInitialState } from './user';
import permissionsReducer, {
  INITIAL_STATE as permissionsInitialState,
} from './permissions';
import switchesReducer, {
  INITIAL_STATE as switchesInitialState,
} from './switches';
import { tasksReducer, INITIAL_STATE as tasksInitialState } from './tasks';
import contentTypeReducer, {
  INITIAL_STATE as contentTypeInitialState,
} from './contentType/reducer';
import {
  releaseNotesReducer,
  maintenanceReducer,
  criticalEventsReducer,
  INITIAL_STATE as notificationsInitialState,
} from './notifications/reducer';
import navigationBarReducer, {
  INITIAL_STATE as navigationBarInitialState,
} from '../NavigationBar/reducer';
import componentsReducer, {
  INITIAL_STATE as componentsInitialState,
} from '../components/reducer';

export const INITIAL_STATE = {
  user: userInitialState,
  permissions: permissionsInitialState,
  maintenance: notificationsInitialState,
  criticalEvents: notificationsInitialState,
  releaseNotes: notificationsInitialState,
  switches: switchesInitialState,
  contentType: contentTypeInitialState,
  navigationBar: navigationBarInitialState,
  Core: componentsInitialState,
  tasks: tasksInitialState,
};

const reducer = combineReducers({
  user: userReducer,
  permissions: permissionsReducer,
  releaseNotes: releaseNotesReducer,
  maintenance: maintenanceReducer,
  criticalEvents: criticalEventsReducer,
  switches: switchesReducer,
  contentType: contentTypeReducer,
  navigationBar: navigationBarReducer,
  Core: componentsReducer,
  tasks: tasksReducer,
});

export default reducer;
