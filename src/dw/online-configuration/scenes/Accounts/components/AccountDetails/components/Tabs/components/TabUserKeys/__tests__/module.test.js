import { ACCOUNTS_LIST_ITEM_ONCLICK } from 'dw/online-configuration/scenes/Accounts/actionTypes';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as errors from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import { ACCOUNT_DETAILS_TABS_CHANGE } from '../../../actionTypes';
import { middleware } from '../middleware';
import { reducer, INITIAL_STATE } from '../reducer';
import { dedicationSelector } from '../selectors';
import { TAB_KEYS } from '../../../constants';

const userID = '123456789';
const data = [
  {
    index: 1,
    dedicated: true,
    value: '16',
  },
  {
    index: 2,
    dedicated: false,
    value: '17',
  },
];
const payload = { data };
const values = {
  writeType: '0',
  index: '3',
  value: '5',
};
const err = 'error';

const fetchUserKeys = actions.fetchUserKeys(userID);
const fetchUserKeysSuccess = actions.fetchUserKeysSuccess(payload);
const fetchUserKeysFailed = actions.fetchUserKeysFailed(err);
const addUserKey = actions.addUserKey(values);
const addUserKeySuccess = actions.addUserKeySuccess();
const openAddKeyModal = actions.openAddKeyModal();
const closeAddKeyModal = actions.closeAddKeyModal();

describe('Accounts - TabUserKeys', () => {
  describe('Action Creators', () => {
    it('ACCOUNTS_TAB_USER_KEYS_FETCH', () => {
      expect(fetchUserKeys).toHaveProperty(
        'type',
        AT.ACCOUNTS_TAB_USER_KEYS_FETCH
      );
      expect(fetchUserKeys).toHaveProperty('userID', userID);
    });

    it('ACCOUNTS_TAB_USER_KEYS_FETCH_SUCCESS', () => {
      expect(fetchUserKeysSuccess).toHaveProperty(
        'type',
        AT.ACCOUNTS_TAB_USER_KEYS_FETCH_SUCCESS
      );
      expect(fetchUserKeysSuccess).toHaveProperty('userKeys', data);
    });

    it('ACCOUNTS_TAB_USER_KEYS_ADD', () => {
      const dispatch = jest.fn();
      const getState = jest.fn(() => ({
        Scenes: { Accounts: { selectedAccount: { userID } } },
      }));
      addUserKey(dispatch, getState);
      const expected = {
        type: AT.ACCOUNTS_TAB_USER_KEYS_ADD,
        userID,
        values,
      };
      expect(dispatch.mock.calls[0]).toEqual([expected]);
    });

    it('ACCOUNTS_TAB_USER_KEYS_ADD_SUCCESS', () => {
      expect(addUserKeySuccess).toHaveProperty(
        'type',
        AT.ACCOUNTS_TAB_USER_KEYS_ADD_SUCCESS
      );
    });

    it('ACCOUNTS_TAB_USER_KEYS_OPEN_MODAL', () => {
      expect(openAddKeyModal).toHaveProperty(
        'type',
        AT.ACCOUNTS_TAB_USER_KEYS_OPEN_MODAL
      );
    });

    it('ACCOUNTS_TAB_USER_KEYS_CLOSE_MODAL', () => {
      expect(closeAddKeyModal).toHaveProperty(
        'type',
        AT.ACCOUNTS_TAB_USER_KEYS_CLOSE_MODAL
      );
    });

    it('fetchUserKeysFailed', () => {
      const dispatch = jest.fn();
      const nonCriticalHTTPErrorMock = jest.fn();
      errors.nonCriticalHTTPError = nonCriticalHTTPErrorMock;
      fetchUserKeysFailed(dispatch);

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
              selectedTab: TAB_KEYS.USER_KEYS,
              TabUserKeys: { fetchedUserID: '987654321' },
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

      expect(storeMock.dispatch).toHaveBeenCalledWith(fetchUserKeys);
      expect(next).toHaveBeenCalledWith(action);
    });

    it('dispatch ACCOUNT_DETAILS_TABS_CHANGE', () => {
      const action = {
        type: ACCOUNT_DETAILS_TABS_CHANGE,
        key: TAB_KEYS.USER_KEYS,
      };
      middleware(storeMock)(next)(action);

      expect(storeMock.dispatch).toHaveBeenCalledWith(fetchUserKeys);
      expect(next).toHaveBeenCalledWith(action);
    });

    it('dispatch ACCOUNTS_TAB_USER_KEYS_ADD_SUCCESS', () => {
      const action = addUserKeySuccess;
      const snackBarShowMock = jest.fn(() => 'show');
      GlobalSnackBarActions.show = snackBarShowMock;

      middleware(storeMock)(next)(action);

      expect(storeMock.dispatch).toHaveBeenCalledWith(fetchUserKeys);
      expect(storeMock.dispatch).toHaveBeenCalledWith(snackBarShowMock());
      expect(next).toHaveBeenCalledWith(action);
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(INITIAL_STATE);
    });

    it('handle ACCOUNTS_TAB_USER_KEYS_FETCH', () => {
      expect(reducer(undefined, fetchUserKeys)).toEqual({
        ...INITIAL_STATE,
        fetchedUserID: userID,
      });
    });

    it('handle ACCOUNTS_TAB_USER_KEYS_FETCH_SUCCESS', () => {
      expect(reducer(undefined, fetchUserKeysSuccess)).toEqual({
        ...INITIAL_STATE,
        userKeys: data,
      });
    });

    it('handle ACCOUNTS_TAB_USER_KEYS_OPEN_MODAL', () => {
      expect(reducer(undefined, openAddKeyModal)).toEqual({
        ...INITIAL_STATE,
        addKeyModalVisible: true,
      });
    });

    it('handle ACCOUNTS_TAB_USER_KEYS_CLOSE_MODAL', () => {
      expect(reducer(undefined, closeAddKeyModal)).toEqual({
        ...INITIAL_STATE,
        addKeyModalVisible: false,
      });
    });

    it('handle ACCOUNTS_TAB_USER_KEYS_ADD_SUCCESS', () => {
      expect(reducer(undefined, addUserKeySuccess)).toEqual({
        ...INITIAL_STATE,
        addKeyModalVisible: false,
      });
    });
  });

  describe('Selectors', () => {
    it('validate dedicationSelector', () => {
      const state = {
        Scenes: {
          Accounts: { Tabs: { TabUserKeys: { userKeys: data } } },
        },
      };
      const expected = {
        dedicated: [
          {
            dedicated: true,
            index: 1,
            key: 1,
            value: '16',
          },
        ],
        nonDedicated: [
          {
            dedicated: false,
            index: 2,
            key: 2,
            value: '17',
          },
        ],
      };
      expect(dedicationSelector(state)).toEqual(expected);
    });
  });
});
