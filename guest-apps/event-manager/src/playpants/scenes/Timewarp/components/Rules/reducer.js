import { combineReducers } from 'redux';
import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import * as AT from './actionTypes';

const clientRulesSchemaReducer = createFetchReducer(
  AT.FETCH_CLIENT_RULES_SCHEMA
);

export default combineReducers({
  clientRulesSchema: clientRulesSchemaReducer,
});
