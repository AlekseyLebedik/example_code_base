import { combineReducers } from 'redux';
import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import { reducer as groupsReducer } from './Groups/reducer';
import { reducer as UsersReducer } from './Users/reducer';
import { reducer as CompaniesReducer } from './Companies/reducer';
import { COMPANIES_LIST_PREFIX } from './constants';

const fetchCompaniesListReducer = createFetchReducer(COMPANIES_LIST_PREFIX);

const reducer = combineReducers({
  Groups: groupsReducer,
  Users: UsersReducer,
  Companies: CompaniesReducer,
  companies: fetchCompaniesListReducer,
});

export default reducer;
