import { combineReducers } from 'redux';
import scheduleStoriesReducer from './components/ScheduleStories/reducer';
import rulesReducer from './components/Rules/reducer';

const reducer = combineReducers({
  scheduleStories: scheduleStoriesReducer,
  rules: rulesReducer,
});

export default reducer;
