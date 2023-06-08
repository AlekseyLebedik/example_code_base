import { createStore as _createStore } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import { applyMiddleware } from 'dw/core/helpers/store';
import devzoneCoreMiddlewares from '@demonware/devzone-core/middlewares';
import scenesMiddlewares from 'abtesting/scenes/middlewares';
import reducer from './reducer';

export default function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = _createStore(
    reducer,
    applyMiddleware('abtesting', [
      ...devzoneCoreMiddlewares,
      ...scenesMiddlewares,

      thunk,
      sagaMiddleware,
    ])
  );

  return { sagaMiddleware, store };
}
