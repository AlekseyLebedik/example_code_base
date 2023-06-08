import { combineReducers } from 'redux';

import { reducer as ABTestFormReducer } from './ABTestForm/reducer';
import { reducer as UpdateReducer } from './Update/reducer';
import ABTestGroupsReducer from './ABTestGroups/reducer';

const reducer = combineReducers({
  ABTestForm: ABTestFormReducer,
  Update: UpdateReducer,
  ABTestGroups: ABTestGroupsReducer,
});

export default reducer;
