import { combineReducers } from 'redux';

import globalProgressReducer, {
  INITIAL_STATE as globalProgressInitialState,
} from './GlobalProgress/reducer';

import globalSnackBarReducer, {
  INITIAL_STATE as globalSnackBarInitialState,
} from './GlobalSnackBar/reducer';

const reducer = combineReducers({
  GlobalProgress: globalProgressReducer,
  GlobalSnackBar: globalSnackBarReducer,
});

export default reducer;

export const INITIAL_STATE = {
  GlobalProgress: globalProgressInitialState,
  GlobalSnackBar: globalSnackBarInitialState,
};
