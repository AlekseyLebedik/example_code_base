import { combineReducers } from 'redux';

import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';

import scenesReducer from './scenes/reducer';
import componentsReducer from './components/reducer';

const reducer = combineReducers({
  Scenes: scenesReducer,
  Components: componentsReducer,
  Core: combineReducers({
    // TODO: Connect reducers of core components that you use
  }),

  // TODO: If you need redux-form
  // form: formReducer,

  user: UserReplica.reducer,
  permissions: PermissionsReplica.reducer,
});

export default reducer;
