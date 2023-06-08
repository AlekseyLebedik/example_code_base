import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import { combineReducers } from 'redux';

import * as AT from './actionTypes';

const pyScriptFetchReducer = createFetchReducer(AT.FETCH_PYSCRIPT_SCHEMAS);

export default combineReducers({ templates: pyScriptFetchReducer });
