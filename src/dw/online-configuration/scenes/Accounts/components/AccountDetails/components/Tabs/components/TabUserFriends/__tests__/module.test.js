import { ACCOUNTS_LIST_ITEM_ONCLICK } from 'dw/online-configuration/scenes/Accounts/actionTypes';
import * as errors from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import { ACCOUNT_DETAILS_TABS_CHANGE } from '../../../actionTypes';
import { middleware } from '../middleware';
import { reducer, INITIAL_STATE } from '../reducer';
import { userFriendsSelector } from '../selectors';
import { TAB_KEYS } from '../../../constants';

const userID = '1234567890';
const friendId = '16055626095370633228';
const data = [
  {
    updateTime: '1530039410',
    friendName: 'SHG-JTran',
    pending: 0,
    friendID: friendId,
  },
];
const nextPageToken = 'CAE';
const payload = {
  nextPageToken,
  data,
};
const err = 'error';

const fetchUserFriends = actions.fetchUserFriends(userID);
const fetchUserFriendsSuccess = actions.fetchUserFriendsSuccess(payload, false);
const fetchUserFriendsFailed = actions.fetchUserFriendsFailed(err);

describe('Accounts - TabUserFriends', () => {
  describe('Action Creators', () => {
    it('ACCOUNTS_TAB_USER_FRIENDS_FETCH', () => {
      expect(fetchUserFriends).toHaveProperty(
        'type',
        AT.ACCOUNTS_TAB_USER_FRIENDS_FETCH
      );
      expect(fetchUserFriends).toHaveProperty('userID', userID);
      expect(actions.fetchUserFriends(userID, { friendId })).toHaveProperty(
        'params',
        { friendId }
      );
    });

    it('ACCOUNTS_TAB_USER_FRIENDS_FETCH_SUCCESS', () => {
      expect(fetchUserFriendsSuccess).toHaveProperty(
        'type',
        AT.ACCOUNTS_TAB_USER_FRIENDS_FETCH_SUCCESS
      );
      expect(fetchUserFriendsSuccess).toHaveProperty('userFriends', data);
      expect(fetchUserFriendsSuccess).toHaveProperty(
        'nextPageToken',
        nextPageToken
      );
      expect(fetchUserFriendsSuccess).toHaveProperty('append', false);
    });

    it('fetchUserFriendsFailed', () => {
      const dispatch = jest.fn();
      const nonCriticalHTTPErrorMock = jest.fn();
      errors.nonCriticalHTTPError = nonCriticalHTTPErrorMock;
      fetchUserFriendsFailed(dispatch);

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
              selectedTab: TAB_KEYS.USER_FRIENDS,
              TabUserFriends: { fetchedUserID: '987654321' },
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

      expect(storeMock.dispatch).toHaveBeenCalledWith(fetchUserFriends);
      expect(next).toHaveBeenCalledWith(action);
    });

    it('dispatch ACCOUNT_DETAILS_TABS_CHANGE', () => {
      const action = {
        type: ACCOUNT_DETAILS_TABS_CHANGE,
        key: TAB_KEYS.USER_FRIENDS,
      };
      middleware(storeMock)(next)(action);

      expect(storeMock.dispatch).toHaveBeenCalledWith(fetchUserFriends);
      expect(next).toHaveBeenCalledWith(action);
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('handle ACCOUNTS_TAB_USER_FRIENDS_FETCH', () => {
      expect(reducer(undefined, fetchUserFriends)).toEqual({
        ...INITIAL_STATE,
        fetchedUserID: userID,
      });
    });

    it('handle ACCOUNTS_TAB_USER_FRIENDS_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(undefined, actions.fetchUserFriendsSuccess({ data: [] }))
      ).toEqual(INITIAL_STATE);
    });

    it('handle ACCOUNTS_TAB_USER_FRIENDS_FETCH_SUCCESS: userFriends and nextPagetoken assignation', () => {
      expect(reducer(undefined, fetchUserFriendsSuccess)).toEqual({
        ...INITIAL_STATE,
        userFriends: data,
        nextPageToken,
      });
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { userFriends: [1, 2] },
          actions.fetchUserFriendsSuccess({ data: [3, 4] }, false)
        )
      ).toEqual({ ...INITIAL_STATE, userFriends: [3, 4] });
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { userFriends: [1, 2] },
          actions.fetchUserFriendsSuccess({ data: [3, 4] }, true)
        )
      ).toEqual({ ...INITIAL_STATE, userFriends: [1, 2, 3, 4] });
    });
  });

  describe('Selectors', () => {
    it('validate userFriendsSelector', () => {
      const state = {
        Scenes: {
          Accounts: { Tabs: { TabUserFriends: { userFriends: data } } },
        },
      };
      const expected = [
        {
          updateTime: '1530039410',
          friendName: 'SHG-JTran',
          pending: 0,
          friendID: friendId,
          key: friendId,
        },
      ];
      expect(userFriendsSelector(state)).toEqual(expected);
    });
  });
});
