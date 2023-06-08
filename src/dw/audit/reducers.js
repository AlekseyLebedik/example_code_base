import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import errors from '@demonware/devzone-core/helpers/errors';
import criticalErrorReducer from 'dw/core/components/CriticalError/reducer';
import objectPermissionManagerReducer from 'dw/permission-management/components/ObjectPermission/reducer';

import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';
import SwitchesReplica from 'dw/core/replicas/switches';
import ContentTypeReplica from 'dw/core/replicas/contentType';
import modalHandlersReducer from 'dw/core/components/ModalHandlers/reducer';
import scenesReducer from './scenes/reducer';

const reducer = combineReducers({
  Core: combineReducers({
    CriticalError: criticalErrorReducer,
    ModalHandlers: modalHandlersReducer,
    ObjectPermissionManager: objectPermissionManagerReducer,
  }),
  Scenes: scenesReducer,
  errors,
  form: formReducer,
  user: UserReplica.reducer,
  permissions: PermissionsReplica.reducer,
  switches: SwitchesReplica.reducer,
  contentType: ContentTypeReplica.reducer,
});

export default reducer;
