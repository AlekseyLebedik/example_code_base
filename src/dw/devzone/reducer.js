import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import titleSelectorReducer from 'dw/core/components/TitleSelector/reducer';
import UserReplica from 'dw/core/replicas/user';
import PermissionsReplica from 'dw/core/replicas/permissions';
import SwitchesReplica from 'dw/core/replicas/switches';
import ContentTypeReplica from 'dw/core/replicas/contentType';

const reducer = combineReducers({
  user: UserReplica.reducer,
  permissions: PermissionsReplica.reducer,
  switches: SwitchesReplica.reducer,
  contentType: ContentTypeReplica.reducer,
  TitleSelector: titleSelectorReducer,
  form: formReducer,
});

export default reducer;
