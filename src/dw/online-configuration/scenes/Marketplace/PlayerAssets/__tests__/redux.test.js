import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { cancel, takeEvery } from 'redux-saga/effects';

import wait from 'dw/test-utils/wait';
import * as api from 'dw/online-configuration/services/marketplace';

import { Services, ServiceEndpoints } from 'dw/online-configuration/constants';
import {
  mockState,
  DEFAULT_PLATFORM_CONTEXT,
} from 'dw/core/components/ContextSelector/test-utils';
import reducer from 'dw/online-configuration/reducers';

import * as actions from '../actions';
import saga from '../saga';

jest.mock('dw/online-configuration/services/marketplace');

describe('Marketplace', () => {
  describe('PlayerAssets', () => {
    describe('data', () => {
      let store;
      let dispatchedActions;
      beforeEach(() => {
        jest.resetAllMocks();

        dispatchedActions = [];
        const sagaMiddleware = createSagaMiddleware();
        store = createStore(
          reducer,
          mockState({
            serviceNames: Services.Marketplace,
            platformEndpoints: [
              ServiceEndpoints.Marketplace.getPlayerItems,
              ServiceEndpoints.Marketplace.getPlayerBalances,
              ServiceEndpoints.Marketplace.postPlayerAssetChanges,
            ],
          }),
          applyMiddleware(thunk, sagaMiddleware)
        );
        sagaMiddleware.run(saga);
        sagaMiddleware.run(function* monitorSaga() {
          yield takeEvery('*', function* appendAction(action) {
            dispatchedActions.push(action);
            yield cancel();
          });
        });
      });

      describe('postPlayerAssetChanges', () => {
        it('should issue a post request to the api', async () => {
          api.postPlayerAssetChanges.mockReturnValue(
            Promise.resolve({
              data: {},
            })
          );

          store.dispatch(
            actions.postAssetChanges('PLAYER_FORM', '101', {
              fees: {},
              grants: {},
            })
          );
          await wait(0);
          expect(api.postPlayerAssetChanges).toBeCalledWith(
            '101',
            { fees: {}, grants: {} },
            { context: DEFAULT_PLATFORM_CONTEXT, isClan: false }
          );
        });

        it('should dispatch success actions', async () => {
          api.postPlayerAssetChanges.mockReturnValue(
            Promise.resolve({
              data: {},
            })
          );

          store.dispatch(
            actions.postAssetChanges('PLAYER_FORM', '101', {
              fees: {
                currencies: [1],
              },
              grants: {
                currencies: [1],
              },
            })
          );
          await wait(0);
          const containingActions = expect.arrayContaining([
            expect.objectContaining({
              type: '@@redux-form/SET_SUBMIT_SUCCEEDED',
            }),
            expect.objectContaining({
              type: '@@redux-form/STOP_SUBMIT',
            }),
            expect.objectContaining({
              type: 'PLAYER_BALANCES_FETCH',
            }),
            expect.objectContaining({ type: 'GLOBAL_SNACK_BAR_SHOW' }),
          ]);
          expect(dispatchedActions).toEqual(containingActions);
        });

        it('should dispatch error actions on failure', async () => {
          api.postPlayerAssetChanges.mockReturnValue(
            Promise.reject(new Error('mock error'))
          );

          store.dispatch(
            actions.postAssetChanges('PLAYER_FORM', '101', {
              fees: {
                currencies: [1],
              },
              grants: {
                currencies: [1],
              },
            })
          );
          await wait(0);
          const containingActions = expect.arrayContaining([
            expect.objectContaining({
              type: '@@redux-form/SET_SUBMIT_FAILED',
            }),
            expect.objectContaining({
              type: 'GLOBAL_SNACK_BAR_SHOW',
            }),
          ]);
          expect(dispatchedActions).toEqual(containingActions);
        });
      });
    });
  });
});
