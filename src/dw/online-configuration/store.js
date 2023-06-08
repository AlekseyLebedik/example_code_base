// import { createStore as _createStore } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// import { applyMiddleware } from 'dw/core/helpers/store';
import { middleware as criticalErrorMiddleware } from 'dw/core/components/CriticalError/middleware';
import devzoneCoreMiddlewares from '@demonware/devzone-core/middlewares';

import reducers from './reducers';
import scenesMiddlewares from './scenes/middlewares';
import componentsMiddlewares from './components/middlewares';

// eslint-disable-next-line
let store = null;

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const localStore = configureStore({
    reducer: reducers,
    middleware: [
      ...devzoneCoreMiddlewares,
      ...scenesMiddlewares,
      ...componentsMiddlewares,
      criticalErrorMiddleware,
      thunk,
      sagaMiddleware,
    ],
  });

  // TODO: remove this global injection
  store = localStore;

  return { sagaMiddleware, store: localStore };
}

export { store };
