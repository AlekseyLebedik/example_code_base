import { createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import devzoneCoreMiddlewares from '@demonware/devzone-core/middlewares';
import { applyMiddleware } from 'dw/core/helpers/store';

import reducer from './reducers';

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = _createStore(
    reducer,
    applyMiddleware('audit-logs', [
      ...devzoneCoreMiddlewares,
      thunk,
      sagaMiddleware,
    ])
  );

  return { sagaMiddleware, store };
}
