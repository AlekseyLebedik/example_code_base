import reduceReducers from 'reduce-reducers';
import { combineReducers } from 'redux';
import {
  createFetchReducer,
  createUpdateReducer,
} from '@demonware/devzone-core/helpers/reducers';
import * as AT from './actionTypes';

const membersReducer = createFetchReducer(AT.FETCH_GROUP_MEMBERS);
const updateMembersReducer = createUpdateReducer(AT.UPDATE_GROUP_MEMBERS);

const reducer = combineReducers({
  members: reduceReducers(membersReducer, updateMembersReducer),
});

export default reducer;
