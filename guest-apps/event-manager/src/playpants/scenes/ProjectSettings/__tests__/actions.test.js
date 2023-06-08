import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('ProjectSettings', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchAvailableUsers', () => {
      it('returns FETCH_AVAILABLE_USERS action', () => {
        expect(actions.fetchAvailableUsers()).toMatchObject({
          type: `${AT.FETCH_AVAILABLE_USERS}_FETCH`,
          append: false,
          params: { sort: 'name' },
          urlID: null,
        });
      });
    });

    describe('searchUsers', () => {
      it('returns SEARCH_USERS action', () => {
        expect(actions.searchUsers('test')).toMatchObject({
          type: AT.SEARCH_USERS,
          query: 'test',
        });
      });
    });

    describe('filterGroups', () => {
      it('returns FILTER_GROUPS action', () => {
        expect(actions.filterGroups('Demonware')).toMatchObject({
          type: AT.FILTER_GROUPS,
          group: 'Demonware',
        });
      });
    });

    describe('changeTab', () => {
      it('returns CHANGE_TAB action', () => {
        expect(actions.changeTab('PS', 'authorizers')).toMatchObject({
          type: AT.CHANGE_TAB,
          tabType: 'PS',
          selectedTab: 'authorizers',
        });
      });
    });

    describe('updateProjectSetting', () => {
      it('returns UPDATE_PROJECT_SETTING action', () => {
        expect(
          actions.updateProjectSetting(1, 'color_settings', {
            title: 1,
            color: '#000000',
          })
        ).toMatchObject({
          type: AT.UPDATE_PROJECT_SETTING,
          projectID: 1,
          setting: 'color_settings',
          data: {
            color: '#000000',
            title: 1,
          },
        });
      });
    });

    describe('updateProjectSettingSucceed', () => {
      it('returns UPDATE_PROJECT_SETTING_SUCCEED action', () => {
        expect(actions.updateProjectSettingSucceed()).toMatchObject({
          type: AT.UPDATE_PROJECT_SETTING_SUCCEED,
        });
      });
    });

    describe('fetchFailed', () => {
      it('dispatches NonCriticalError show action', () => {
        const action = actions.fetchFailed(Error());
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
