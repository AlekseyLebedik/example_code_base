import { createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { applyMiddleware } from 'dw/core/helpers/store';

import reducer from './reducer';

// eslint-disable-next-line
let store = null;

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const localStore = _createStore(
    reducer,
    applyMiddleware('devzone', [thunk, sagaMiddleware])
  );
  store = localStore;

  return { sagaMiddleware, store: localStore };
}

export { store };
