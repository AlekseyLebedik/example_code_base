import { combineReducers } from 'redux';

import AppReducer from './App/reducer';
import TemplateFormDialogReducer from './TemplateFormDialog/reducer';
import ScheduleComponentReducer from './ScheduleComponent/reducer';
import GamertagManagementReducer from './GamertagManagement/reducer';
import EventsTimelineReducer from './EventsTimeline/reducer';

export default combineReducers({
  App: AppReducer,
  TemplateFormDialog: TemplateFormDialogReducer,
  ScheduleComponent: ScheduleComponentReducer,
  GamertagManagement: GamertagManagementReducer,
  EventsTimeline: EventsTimelineReducer,
});
