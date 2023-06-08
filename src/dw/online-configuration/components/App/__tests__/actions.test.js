import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';

import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('App', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('resetProjectData', () => {
      it('returns an APP_RESET_PROJECT_DATA action', () => {
        expect(actions.resetProjectData()).toMatchObject({
          type: AT.APP_RESET_PROJECT_DATA,
        });
      });
    });

    describe('fetchServicesAvailabilitySuccess', () => {
      it('returns an action of type APP_FETCH_SERVICES_AVAILABILITY_SUCCESS', () => {
        const action = actions.fetchServicesAvailabilitySuccess([
          { name: 's1', configured: true },
          { name: 's2', configured: false },
        ]);
        expect(action).toMatchObject({
          type: AT.APP_FETCH_SERVICES_AVAILABILITY_SUCCESS,
          services: [
            { name: 's1', configured: true },
            { name: 's2', configured: false },
          ],
        });
      });
    });

    describe('fetchEnvironmentServicesSuccess', () => {
      it('returns an APP_FETCH_SERVICES_AVAILABILITY_SUCCESS action for all services of a given environment', () => {
        const action = actions.fetchEnvironmentServicesSuccess({
          usesAE: true,
          usesMarketplace: false,
          usesExchangeMarketplace: false,
          usesAsyncMMP: true,
          usesObjectStore: true,
          usesGroups: true,
          usesLegacyStore: false,
          usesAccountsManagement: false,
          usesDDLTranslation: true,
        });

        expect(action).toMatchObject({
          type: AT.APP_FETCH_SERVICES_AVAILABILITY_SUCCESS,
          services: [
            { name: 'achievements', configured: true },
            { name: 'marketplace', configured: false },
            { name: 'exchange_marketplace', configured: false },
            { name: 'matchmaking', configured: true },
            { name: 'online_games', configured: false },
            { name: 'storages', configured: false },
            { name: 'objectstore', configured: true },
            { name: 'groups', configured: true },
            { name: 'accounts_management', configured: false },
            { name: 'ddl_translation', configured: true },
          ],
        });
      });
    });

    describe('fetchTitleEnvironment', () => {
      it('returns an APP_FETCH_TITLE_ENVIRONMENT action', () => {
        const action = actions.fetchTitleEnvironment({});

        expect(action).toMatchObject({
          type: AT.APP_FETCH_TITLE_ENVIRONMENT,
          env: {},
        });
      });
    });

    describe('fetchTitleEnvironmentSuccess', () => {
      it('dispatches APP_FETCH_TITLE_ENVIRONMENT_SUCCESS and APP_FETCH_TITLE_ENVIRONMENT action', () => {
        const action = actions.fetchTitleEnvironmentSuccess({
          usesAE: true,
          usesMarketplace: false,
          usesExchangeMarketplace: false,
          usesAsyncMMP: false,
          usesObjectStore: true,
          usesGroups: true,
          usesLegacyStore: false,
          usesAccountsManagement: false,
          usesDDLTranslation: true,
        });

        expect(action).toAsyncDispatch(
          {
            type: AT.APP_FETCH_TITLE_ENVIRONMENT_SUCCESS,
          },
          {
            type: AT.APP_FETCH_SERVICES_AVAILABILITY_SUCCESS,
            services: [
              { name: 'achievements', configured: true },
              { name: 'marketplace', configured: false },
              { name: 'exchange_marketplace', configured: false },
              { name: 'matchmaking', configured: false },
              { name: 'online_games', configured: true },
              { name: 'storages', configured: false },
              { name: 'objectstore', configured: true },
              { name: 'groups', configured: true },
              { name: 'accounts_management', configured: false },
              { name: 'ddl_translation', configured: true },
            ],
          }
        );
      });
    });

    describe('fetchTitleEnvironmentFailed', () => {
      it('dispatches NonCriticalError show action', () => {
        const action = actions.fetchTitleEnvironmentFailed(Error());
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
