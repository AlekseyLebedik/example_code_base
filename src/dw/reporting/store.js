import { createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { applyMiddleware } from 'dw/core/helpers/store';

import reducer from './reducers';

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = _createStore(
    reducer,
    applyMiddleware('reporting', [thunk, sagaMiddleware])
  );

  return { sagaMiddleware, store };
}
