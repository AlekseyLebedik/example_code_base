import { combineReducers } from 'redux';

import { reducer as baseViewPropsReducer } from './BaseViewProps/reducer';

const reducer = combineReducers({
  BaseViewProps: baseViewPropsReducer,
});

export default reducer;
