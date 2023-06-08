import {
  configureStore,
  EnhancedStore,
  isPlain,
  SerializableStateInvariantMiddlewareOptions,
} from '@reduxjs/toolkit';
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga';

import { middleware as criticalErrorMiddleware } from 'dw/core/components/CriticalError/middleware';
import devzoneCoreMiddlewares from '@demonware/devzone-core/middlewares';

import scenesMiddlewares from './scenes/middlewares';
import reducer from './reducer';

// the following allows functions to exist in state and actions, but we should rethink this according to best practices
const serializableStateMiddlewareOptions: SerializableStateInvariantMiddlewareOptions =
  {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    isSerializable: (value: any) => {
      return typeof value === 'function' || isPlain(value);
    },
  };

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: serializableStateMiddlewareOptions,
    }).concat(
      ...devzoneCoreMiddlewares,
      ...scenesMiddlewares,
      criticalErrorMiddleware,
      sagaMiddleware
    ),
  devTools: process.env.NODE_ENV !== 'production',
});

export default function createStore(): {
  sagaMiddleware: SagaMiddleware;
  store: EnhancedStore;
} {
  return { sagaMiddleware, store };
}
