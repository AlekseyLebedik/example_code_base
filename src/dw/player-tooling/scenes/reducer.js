import { combineReducers } from 'redux';
import { reducer as PlayerAccountsReducer } from './PlayerAccounts/reducer';

const reducer = combineReducers({
  PlayerAccounts: PlayerAccountsReducer,
});

export default reducer;
