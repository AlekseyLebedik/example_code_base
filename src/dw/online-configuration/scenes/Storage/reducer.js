import { combineReducers } from 'redux';
import { reducer as publisherStorageReducer } from './PublisherStorage/reducer';
import publisherVariablesReducer from './PublisherVariables/reducer';
import { reducer as contentServerReducer } from './ContentServer/reducer';
import { reducer as userContextStorageReducer } from './UserContextStorage/reducer';

export const reducer = combineReducers({
  ContentServer: contentServerReducer,
  PublisherStorage: publisherStorageReducer,
  PublisherVariables: publisherVariablesReducer,
  UserContextStorage: userContextStorageReducer,
});
