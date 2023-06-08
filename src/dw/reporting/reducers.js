import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';
import SwitchesReplica from 'dw/core/replicas/switches';
import ContentTypeReplica from 'dw/core/replicas/contentType';
import GraphReducer from 'dw/devzone/components/Graph/reducer';

// import scenesReducer from './scenes/reducer';
import reportingReducer from './reducer';

const reducer = combineReducers({
  // Scenes: scenesReducer,
  reporting: reportingReducer,

  user: UserReplica.reducer,
  permissions: PermissionsReplica.reducer,
  switches: SwitchesReplica.reducer,
  contentType: ContentTypeReplica.reducer,

  form: formReducer,

  graph: GraphReducer,
});

export default reducer;
