import { combineReducers } from 'redux';
import scheduleStoryFormDialogReducer from './components/ScheduleStoryFormDialog/reducer';

const reducer = combineReducers({
  scheduleStoryFormDialog: scheduleStoryFormDialogReducer,
});

export default reducer;
