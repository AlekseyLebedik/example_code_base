import { combineReducers } from 'redux';
import conflictsReducer from './conflictsSlice';

const reducer = combineReducers({
  conflicts: conflictsReducer,
});

export default reducer;
