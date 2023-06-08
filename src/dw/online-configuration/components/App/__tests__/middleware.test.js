import { CHANGE_TITLE } from 'dw/core/components/TitleSelector/actionTypes';
import * as AT from '../actionTypes';
import middleware from '../middleware';

describe('App', () => {
  describe('Middleware', () => {
    const store = {
      getState() {
        return {
          Components: {
            App: {
              currentTitleEnv: {
                usesAE: true,
                usesMarketplace: false,
                usesExchangeMarketplace: false,
                usesAsyncMMP: true,
                usesObjectStore: true,
                usesGroups: true,
                usesLegacyStore: false,
                usesAccountsManagement: false,
                usesDDLTranslation: true,
              },
            },
          },
        };
      },
      dispatch: jest.fn(),
    };
    const next = jest.fn();

    beforeEach(() => {
      store.dispatch.mockReset();
      next.mockReset();
    });

    it('dispatches APP_FETCH_SERVICES_AVAILABILITY_SUCCESS and FETCH_TITLE_ENVIRONMENT on CHANGE_TITLE', () => {
      const action = {
        type: CHANGE_TITLE,
        environment: {},
      };

      middleware(store)(next)(action);
      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: AT.APP_FETCH_TITLE_ENVIRONMENT,
        })
      );

      expect(store.dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
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
        })
      );
    });
  });
});
