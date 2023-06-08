import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import errors from '@demonware/devzone-core/helpers/errors';

import criticalErrorReducer from 'dw/core/components/CriticalError/reducer';
import modalHandlersReducer from 'dw/core/components/ModalHandlers/reducer';
import tableHydratedReducer from 'dw/core/components/TableHydrated/reducer';

import scenesReducer from 'abtesting/scenes/reducer';
import componentsReducer from 'abtesting/components/reducer';

import expyReducer from '../expy/reducer';

const { UserReplica, PermissionsReplica, SwitchesReplica, ContentTypeReplica } =
  window.Replicas;

const reducer = combineReducers({
  Scenes: scenesReducer,
  Components: componentsReducer,
  Core: combineReducers({
    CriticalError: criticalErrorReducer,
    ModalHandlers: modalHandlersReducer,
    TableHydrated: tableHydratedReducer,
  }),
  errors,
  form: formReducer,

  Expy: expyReducer,

  user: UserReplica.reducer,
  permissions: PermissionsReplica.reducer,
  switches: SwitchesReplica.reducer,
  contentType: ContentTypeReplica.reducer,
});

export default reducer;
