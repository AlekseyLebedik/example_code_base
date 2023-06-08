import {
  ACCOUNTS_LIST_ITEM_ONCLICK,
  ACCOUNTS_UPDATE_SELECTED_ACCOUNT,
} from 'dw/online-configuration/scenes/Accounts/actionTypes';
import * as errors from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import { ACCOUNT_DETAILS_TABS_CHANGE } from '../../../actionTypes';
import { middleware } from '../middleware';
import { profilesSelector } from '../selectors';
import { reducer, INITIAL_STATE } from '../reducer';
import { TAB_KEYS } from '../../../constants';

const userID = '123456789';
const data = {
  publicProfile: [['version_cust_userProfilesPublic', 7]],
  privateProfile: [['version_cust_userProfilesPrivate', 3]],
  id: userID,
  name: 'rockstar_user',
};
const payload = { data };
const err = 'error';

const fetchUserDetails = actions.fetchUserDetails(userID);
const fetchUserDetailsSuccess = actions.fetchUserDetailsSuccess(payload);
const fetchUserDetailsFailed = actions.fetchUserDetailsFailed(err);

describe('Accounts - TabUserDetails', () => {
  describe('Action Creators', () => {
    it('ACCOUNTS_TAB_USER_DETAILS_FETCH', () => {
      expect(fetchUserDetails).toHaveProperty(
        'type',
        AT.ACCOUNTS_TAB_USER_DETAILS_FETCH
      );
      expect(fetchUserDetails).toHaveProperty('userID', userID);
    });

    it('ACCOUNTS_TAB_USER_DETAILS_FETCH_SUCCESS', () => {
      const dispatch = jest.fn();
      const expectedActions = [
        {
          type: AT.ACCOUNTS_TAB_USER_DETAILS_FETCH_SUCCESS,
          userDetails: payload.data,
        },
        {
          type: ACCOUNTS_UPDATE_SELECTED_ACCOUNT,
          data: payload.data,
        },
      ];

      fetchUserDetailsSuccess(dispatch);
      expect(dispatch.mock.calls[0]).toEqual([expectedActions[0]]);
      expect(dispatch.mock.calls[1]).toEqual([expectedActions[1]]);
    });

    it('fetchUserDetailsFailed', () => {
      const dispatch = jest.fn();
      const nonCriticalHTTPErrorMock = jest.fn();
      errors.nonCriticalHTTPError = nonCriticalHTTPErrorMock;
      fetchUserDetailsFailed(dispatch);

      expect(nonCriticalHTTPErrorMock).toHaveBeenCalledWith(err);
    });
  });

  describe('Middleware', () => {
    let storeMock = null;
    let next = null;

    beforeEach(() => {
      const scenes = {
        Scenes: {
          Accounts: {
            Tabs: {
              selectedTab: TAB_KEYS.USER_DETAILS,
              TabUserDetails: { fetchedUserID: '987654321' },
            },
            selectedAccount: { userID },
          },
        },
      };
      storeMock = {
        getState: jest.fn(() => scenes),
        dispatch: jest.fn(),
      };
      next = jest.fn();
    });

    it('dispatch ACCOUNTS_LIST_ITEM_ONCLICK', () => {
      const action = {
        type: ACCOUNTS_LIST_ITEM_ONCLICK,
        account: { userID },
      };
      middleware(storeMock)(next)(action);

      expect(storeMock.dispatch).toHaveBeenCalledWith(fetchUserDetails);
      expect(next).toHaveBeenCalledWith(action);
    });

    it('dispatch ACCOUNT_DETAILS_TABS_CHANGE', () => {
      const action = {
        type: ACCOUNT_DETAILS_TABS_CHANGE,
        key: TAB_KEYS.USER_DETAILS,
      };
      middleware(storeMock)(next)(action);

      expect(storeMock.dispatch).toHaveBeenCalledWith(fetchUserDetails);
      expect(next).toHaveBeenCalledWith(action);
    });

    describe('Reducer', () => {
      it('return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
      });

      it('handle ACCOUNTS_TAB_USER_DETAILS_FETCH_SUCCESS', () => {
        expect(
          reducer(undefined, {
            type: AT.ACCOUNTS_TAB_USER_DETAILS_FETCH_SUCCESS,
            userDetails: payload.data,
          })
        ).toEqual({
          ...INITIAL_STATE,
          userDetails: payload.data,
          fetchedUserID: userID,
        });
      });
    });

    describe('Selectors', () => {
      it('validate profilesSelector', () => {
        const state = {
          Scenes: {
            Accounts: { Tabs: { TabUserDetails: { userDetails: data } } },
          },
        };
        const expected = {
          private: [
            {
              key: 'version_cust_userProfilesPrivate',
              userKey: 'version_cust_userProfilesPrivate',
              value: 3,
            },
          ],
          public: [
            {
              key: 'version_cust_userProfilesPublic',
              userKey: 'version_cust_userProfilesPublic',
              value: 7,
            },
          ],
        };
        expect(profilesSelector(state)).toEqual(expected);
      });
    });
  });
});
