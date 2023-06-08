import { combineReducers } from 'redux';

import objectGroupsReducer from './ObjectGroups/reducer';
import objectStatReducer from './UserObjectStats/reducer';
import publisherObjectsReducer from './PublisherObjects/reducer';
import userObjectsReducer from './UserObjectsHOC/reducer';
import pooledObjectsReducer from './UserPooledObjects/reducer';

const reducer = combineReducers({
  ObjectGroups: objectGroupsReducer,
  PublisherObjects: publisherObjectsReducer,
  UserObjects: userObjectsReducer,
  ObjectStats: objectStatReducer,
  PooledObjects: pooledObjectsReducer,
});

export default reducer;
