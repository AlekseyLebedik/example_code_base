import React from 'react';

import { Provider } from 'react-redux';

export function makeUnit(routes, createStore, { sagas = null } = {}) {
  const { sagaMiddleware, store } = createStore();
  if (sagas && sagaMiddleware) {
    if (Array.isArray(sagas)) {
      sagas.forEach(s => sagaMiddleware.run(s));
    } else {
      sagaMiddleware.run(sagas);
    }
  }

  const UnitContainer = () => (
    <Provider store={store}>
      <>{routes}</>
    </Provider>
  );

  return UnitContainer;
}

export default makeUnit;
