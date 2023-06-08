import { combineReducers } from 'redux';
import scheduleStoriesCalendarReducer from './components/ScheduleStoriesCalendar/reducer';
import scheduleStoriesDetailReducer from './components/Details/reducer';
import taskMonitorReducer from './components/TaskMonitor/reducer';

const reducer = combineReducers({
  scheduleStoriesCalendar: scheduleStoriesCalendarReducer,
  scheduleStoriesDetail: scheduleStoriesDetailReducer,
  taskMonitor: taskMonitorReducer,
});

export default reducer;
