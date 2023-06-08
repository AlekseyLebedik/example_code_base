import { combineReducers } from 'redux';
import connectionLogsByTimeReducer from './components/LogsByTime/reducer';
import connectionLogsByUserReducer from './components/LogsByUser/reducer';

export default combineReducers({
  ByTime: connectionLogsByTimeReducer,
  ByUser: connectionLogsByUserReducer,
});
