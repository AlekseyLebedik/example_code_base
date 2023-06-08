import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import { reducer as formReducer } from 'redux-form';

import criticalErrorReducer from 'dw/core/components/CriticalError/reducer';
import eventsCalendarReducer from 'dw/core/components/EventsCalendar/reducer';
import modalHandlersReducer from 'dw/core/components/ModalHandlers/reducer';

import errors from '@demonware/devzone-core/helpers/errors';
import { reducer as feedbackWrapperReducer } from './components/FeedbackWrapper/reducer';

import componentsReducer from './components/reducer';
import scenesReducer from './scenes/reducer';

const { UserReplica, PermissionsReplica, SwitchesReplica, ContentTypeReplica } =
  window.Replicas;

export default combineReducers({
  Scenes: scenesReducer,
  Components: componentsReducer,
  Core: combineReducers({
    CriticalError: criticalErrorReducer,
    EventsCalendar: eventsCalendarReducer,
    ModalHandlers: modalHandlersReducer,
  }),
  errors: reduceReducers(feedbackWrapperReducer, errors),
  form: formReducer,
  user: UserReplica.reducer,
  permissions: PermissionsReplica.reducer,
  switches: SwitchesReplica.reducer,
  contentType: ContentTypeReplica.reducer,
});
