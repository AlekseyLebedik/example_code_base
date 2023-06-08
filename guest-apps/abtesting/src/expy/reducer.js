import { combineReducers } from 'redux';

import drawer from './scenes/Tests/state/reducer';
import tests from './scenes/Table/state/reducer';
import edit from './scenes/Edit/state/reducer';
import activeTest from './scenes/Preview/state/reducer';
import modal from './components/Modal/state/reducer';

const reducer = combineReducers({
  drawer,
  tests,
  activeTest,
  edit,
  modal,
});

export default reducer;
