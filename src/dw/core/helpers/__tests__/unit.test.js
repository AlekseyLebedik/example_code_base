import React from 'react';

import { makeUnit } from '../unit';

function App(props) {
  return <div {...props} />;
}

describe('helpers/unit', () => {
  it('renders default', () => {
    const sagaMiddlewareRunMock = jest.fn();
    const sagaMock = jest.fn();
    const createStore = () => ({
      store: { subscribe: jest.fn(), dispatch: jest.fn(), getState: jest.fn() },
      sagaMiddleware: { run: sagaMiddlewareRunMock },
    });
    const unit = makeUnit(<App />, createStore, { sagas: [sagaMock] });

    expect(unit()).toMatchSnapshot();
    expect(sagaMiddlewareRunMock).toHaveBeenLastCalledWith(sagaMock);
  });
});
