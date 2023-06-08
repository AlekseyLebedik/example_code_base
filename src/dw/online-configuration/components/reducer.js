import { combineReducers } from 'redux';

import titleSelectorReducer from 'dw/core/components/TitleSelector/reducer';
import contextSelectorReducer from 'dw/online-configuration/components/ContextSelector/reducer';
import appReducer from './App/reducer';
import sessionViewerReducer from './SessionViewer/reducer';

const reducer = combineReducers({
  App: appReducer,
  TitleSelector: titleSelectorReducer,
  ContextSelector: contextSelectorReducer,
  SessionViewer: sessionViewerReducer,
});

export default reducer;
