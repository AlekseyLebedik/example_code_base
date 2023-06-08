import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import wait from 'dw/test-utils/wait';
import * as api from '@demonware/devzone-core/services/permissions';

import * as actions from '../actions';
import reducer from '../reducer';
import saga from '../saga';

jest.mock('@demonware/devzone-core/services/permissions');

describe('ObjectPermission', () => {
  describe('data', () => {
    let store;
    beforeEach(() => {
      jest.resetAllMocks();
      const sagaMiddleware = createSagaMiddleware();
      store = createStore(reducer, applyMiddleware(sagaMiddleware));
      sagaMiddleware.run(saga);
    });

    describe('companies', () => {
      it('should store the company information once fetched', async () => {
        api.getCompanies.mockReturnValue(
          Promise.resolve({
            data: {
              data: ['company 1'],
            },
          })
        );

        expect(store.getState()).toMatchSnapshot();
        store.dispatch(actions.fetchCompanies());
        await wait(0);
        expect(store.getState()).toMatchSnapshot();
      });

      it('should store information about all companies', async () => {
        api.getCompanies
          .mockReturnValueOnce(
            Promise.resolve({ data: { data: ['company 1'], next: 'next' } })
          )
          .mockReturnValueOnce(
            Promise.resolve({ data: { data: ['company 2'], next: 'next' } })
          )
          .mockReturnValueOnce(
            Promise.resolve({ data: { data: ['company 3'] } })
          );

        store.dispatch(actions.fetchCompanies());
        await wait(0);
        expect(store.getState()).toMatchSnapshot();
      });

      it('should sotre ObjectPermissionManager.initializationError when it fails to load companies', async () => {
        api.getCompanies.mockReturnValue(Promise.reject(new Error()));
        expect(store.getState()).toMatchSnapshot();
        store.dispatch(actions.fetchCompanies());
        await wait(0);
        expect(store.getState()).toMatchSnapshot();
      });
    });

    describe('company-groups', () => {
      it('should store the company groups info once fetched', async () => {
        api.getCompanyGroups.mockReturnValue(
          Promise.resolve({
            data: {
              data: ['company group 1'],
            },
          })
        );

        expect(store.getState()).toMatchSnapshot();
        store.dispatch(actions.fetchCompanyGroups());
        await wait(0);
        expect(store.getState()).toMatchSnapshot();
      });

      it('should store ObjectPermissionManager.initializationError when it fails to load company groups', async () => {
        api.getCompanyGroups.mockReturnValue(Promise.reject(new Error()));
        expect(store.getState()).toMatchSnapshot();
        store.dispatch(actions.fetchCompanyGroups());
        await wait(0);
        expect(store.getState()).toMatchSnapshot();
      });
    });

    describe('object permissions', () => {
      it('should store the object permissions once fetched', async () => {
        api.getUserObjectPermissions.mockReturnValue(
          Promise.resolve({
            data: {
              data: ['permission 1'],
            },
          })
        );

        expect(store.getState()).toMatchSnapshot();
        store.dispatch(actions.fetchObjectPermissions('user'));
        await wait(0);
        expect(store.getState()).toMatchSnapshot();
      });

      it('should store ObjectPermissionManager.initializationError when it fails to load company groups', async () => {
        api.getUserObjectPermissions.mockReturnValue(
          Promise.reject(new Error())
        );
        expect(store.getState()).toMatchSnapshot();
        store.dispatch(actions.fetchObjectPermissions('user'));
        await wait(0);
        expect(store.getState()).toMatchSnapshot();
      });
    });
  });
});
