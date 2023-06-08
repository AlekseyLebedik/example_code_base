import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';

import { combineReducers } from 'redux';

import * as AT from './actionTypes';

const searchedTemplatesReducer = createFetchReducer(AT.SEARCH_TEMPLATES);

const reducer = combineReducers({
  searchedTemplates: searchedTemplatesReducer,
});

export default reducer;
