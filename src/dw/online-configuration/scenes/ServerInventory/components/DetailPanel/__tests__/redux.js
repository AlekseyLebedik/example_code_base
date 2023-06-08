import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import wait from 'dw/test-utils/wait';
import * as api from 'dw/online-configuration/services/matchmaking';

import * as actions from '../actions';
import { reducer } from '../reducer';
import saga from '../saga';

jest.mock('dw/online-configuration/services/matchmaking');

describe('ServerInventory', () => {
  describe('DetailPanel', () => {
    describe('data', () => {
      let store;
      beforeEach(() => {
        jest.resetAllMocks();
        const sagaMiddleware = createSagaMiddleware();
        store = createStore(reducer, applyMiddleware(sagaMiddleware));
        sagaMiddleware.run(saga);
      });

      describe('serverList', () => {
        it('should store list of servers', async () => {
          api.getServers.mockReturnValue(
            Promise.resolve({
              data: {
                data: ['Server 1', 'Server 2'],
              },
            })
          );

          expect(store.getState()).toMatchSnapshot();
          store.dispatch(
            actions.fetchMMServerList({
              context: 'ctx1',
              buildname: 'build-123',
              datacenter: 'dc1',
              state: 'idle',
            })
          );
          await wait(0);
          expect(store.getState()).toMatchSnapshot();
        });

        it('should unset the list of servers on failure', async () => {
          api.getServers.mockReturnValue(Promise.reject(new Error('')));

          expect(store.getState()).toMatchSnapshot();
          store.dispatch(
            actions.fetchMMServerList({
              context: 'ctx1',
              buildname: 'build-123',
              datacenter: 'dc1',
              state: 'idle',
            })
          );
          await wait(0);
          expect(store.getState()).toMatchSnapshot();
        });
      });
    });
  });
});
