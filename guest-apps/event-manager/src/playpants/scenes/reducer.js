import { combineReducers } from 'redux';

import eventReducer from './Event/reducer';
import groupStoriesReducer from './GroupStories/reducer';
import projectSettingsReducer from './ProjectSettings/reducer';
import scheduleReducer from './Schedule/reducer';
import templatesReducer from './Templates/reducer';
import timewarpReducer from './Timewarp/reducer';

export default combineReducers({
  Event: eventReducer,
  GroupStories: groupStoriesReducer,
  ProjectSettings: projectSettingsReducer,
  Schedule: scheduleReducer,
  Templates: templatesReducer,
  Timewarp: timewarpReducer,
});
