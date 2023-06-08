import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import errors from '@demonware/devzone-core/helpers/errors';
import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';
import SwitchesReplica from 'dw/core/replicas/switches';
import ContentTypeReplica from 'dw/core/replicas/contentType';

import sourceSelectReducer from 'dw/core/components/SourceSelect/reducer';
import criticalErrorReducer from 'dw/core/components/CriticalError/reducer';
import modalHandlersReducer from 'dw/core/components/ModalHandlers/reducer';
import tableHydratedReducer from 'dw/core/components/TableHydrated/reducer';
import graphReducer from 'dw/devzone/components/Graph/reducer';

import componentsReducer from './components/reducer';
import { APP_RESET_PROJECT_DATA } from './components/App/actionTypes';
import { INITIAL_STATE as APP_INITIAL_STATE } from './components/App/reducer';

import scenesReducer from './scenes/reducer';

const reducers = combineReducers({
  Scenes: scenesReducer,
  Components: componentsReducer,
  Core: combineReducers({
    CriticalError: criticalErrorReducer,
    ModalHandlers: modalHandlersReducer,
    SourceSelect: sourceSelectReducer,
    TableHydrated: tableHydratedReducer,
  }),

  errors,
  form: formReducer,

  user: UserReplica.reducer,
  permissions: PermissionsReplica.reducer,
  switches: SwitchesReplica.reducer,
  contentType: ContentTypeReplica.reducer,
  graph: graphReducer,
});

const rootReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case APP_RESET_PROJECT_DATA:
      newState = {
        // TODO: remove this
        user: state.user,
        permissions: state.permissions,
        switches: state.switches,
        contentType: state.contentType,

        Components: {
          App: {
            ...APP_INITIAL_STATE,
          },
          TitleSelector: state.Components.TitleSelector,
        },
      };
      break;
    default:
      newState = state;
  }
  return reducers(newState, action);
};

export default rootReducer;
