import scheduleStoriesCalendarSagas from './components/ScheduleStoriesCalendar/sagas';
import scheduleStoriesDetailSagas from './components/Details/sagas';
import taskMonitorSagas from './components/TaskMonitor/sagas';

export default [
  ...scheduleStoriesDetailSagas,
  ...scheduleStoriesCalendarSagas,
  ...taskMonitorSagas,
];
