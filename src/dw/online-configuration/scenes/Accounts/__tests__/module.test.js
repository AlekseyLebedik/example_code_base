import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import * as actions from '../actions';
import * as AT from '../actionTypes';
import { userIdSelector } from '../selectors';
import { makeGetTitleEnvOption } from '../../../../core/helpers/title-env-selectors';

let reducer = null;
const initializeTabsReducerMock = () => {
  jest.mock('../components/AccountDetails/components/Tabs/reducer', () => ({
    INITIAL_STATE: undefined,
    reducer: () => {},
  }));

  import('../reducer').then(({ reducer: origReducer }) => {
    reducer = (initialState, action) => {
      const dispatched = [];
      const dispatchMock = a => dispatched.push(a);
      if (typeof action === 'function') action(dispatchMock);
      else dispatched.push(action);
      let state = initialState;
      dispatched.forEach(a => {
        state = origReducer(state, a);
      });
      return state;
    };
  });
};

const nextPageToken = 'CAE';
const q = 'blah';
const account = {
  userName: 'rockstar_user',
  reputation: '17',
  userID: '1234567890',
};
const data = [account];
const payload = {
  nextPageToken,
  data,
  q,
};
const fileType = 'json';
const fetchAccounts = actions.fetchAccounts({ nextPageToken, q }, false);
const fetchAccountsSuccess = actions.fetchAccountsSuccess(payload, false);
const fetchAccountsFailed = actions.fetchAccountsFailed();
const accountsListItemClick = actions.accountsListItemClick(account);
const exportAccounts = actions.exportAccounts(fileType);

const TEST_REDUCER_INITIAL_STATE = {
  accounts: [],
  nextPageToken: undefined,
  q: undefined,
  selectedAccount: undefined,
  Tabs: undefined,
};

describe('Accounts', () => {
  describe('Action Creators', () => {
    it('ACCOUNTS_FETCH', () => {
      expect(fetchAccounts).toHaveProperty('type', AT.ACCOUNTS_FETCH);
      expect(fetchAccounts).toHaveProperty('params', { nextPageToken, q });
    });

    it('ACCOUNTS_FETCH_SUCCESS', () => {
      expect(fetchAccountsSuccess).toAsyncDispatch({
        type: AT.ACCOUNTS_FETCH_SUCCESS,
        accounts: data,
        nextPageToken,
        q,
      });
    });

    it('fetchAccountsFailed', () => {
      const dispatch = jest.fn();
      const criticalErrorShowMock = jest.fn();
      CriticalErrorActions.show = criticalErrorShowMock;
      fetchAccountsFailed(dispatch);

      expect(criticalErrorShowMock).toHaveBeenCalled();
    });

    it('ACCOUNTS_LIST_ITEM_ONCLICK', () => {
      expect(accountsListItemClick).toHaveProperty(
        'type',
        AT.ACCOUNTS_LIST_ITEM_ONCLICK
      );
      expect(accountsListItemClick).toHaveProperty('account', account);
    });

    it('ACCOUNTS_EXPORT', () => {
      expect(exportAccounts).toHaveProperty('type', AT.ACCOUNTS_EXPORT);
      expect(exportAccounts).toHaveProperty('fileType', fileType);
    });
  });

  describe('Reducer', () => {
    beforeAll(() => initializeTabsReducerMock());

    it('return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(TEST_REDUCER_INITIAL_STATE);
    });

    it('handle ACCOUNTS_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(undefined, actions.fetchAccountsSuccess({ data: [] }, false))
      ).toEqual(TEST_REDUCER_INITIAL_STATE);
    });

    it('handle ACCOUNTS_FETCH_SUCCESS: accounts, nextPagetoken and q assignation', () => {
      expect(reducer(undefined, fetchAccountsSuccess)).toEqual({
        ...TEST_REDUCER_INITIAL_STATE,
        accounts: [account],
        nextPageToken,
        q,
        selectedAccount: account,
      });
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { accounts: [1, 2] },
          actions.fetchAccountsSuccess({ data: [3, 4] }, false)
        )
      ).toEqual({
        ...TEST_REDUCER_INITIAL_STATE,
        accounts: [3, 4],
      });
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { accounts: [1, 2] },
          actions.fetchAccountsSuccess({ data: [3, 4] }, true)
        )
      ).toEqual({
        ...TEST_REDUCER_INITIAL_STATE,
        accounts: [1, 2, 3, 4],
      });
    });

    it('handle ACCOUNTS_LIST_ITEM_ONCLICK', () => {
      expect(reducer(undefined, accountsListItemClick)).toEqual({
        ...TEST_REDUCER_INITIAL_STATE,
        selectedAccount: account,
      });
    });

    it('should handle ACCOUNTS_UPDATE_SELECTED_ACCOUNT', () => {
      expect(
        reducer(undefined, {
          type: AT.ACCOUNTS_UPDATE_SELECTED_ACCOUNT,
          data: { name: 'Iron Man', id: 123456 },
        })
      ).toEqual({
        ...TEST_REDUCER_INITIAL_STATE,
        selectedAccount: {
          userName: 'Iron Man',
          userID: 123456,
        },
      });
    });
  });

  const state = {
    user: {
      projects: [
        {
          titles: [
            {
              id: 5577,
              environments: [
                {
                  shortType: 'live',
                  options: { enable_accounts_export: true },
                },
              ],
            },
          ],
        },
      ],
    },
    Components: {
      TitleSelector: {
        currentTitle: { id: 5577 },
        currentEnv: { shortType: 'live' },
      },
    },
  };
  describe('Selectors', () => {
    it('return the initial state', () => {
      expect(userIdSelector()).toBe(null);
    });

    it('return user name', () => {
      expect(userIdSelector('Iron Man')).toBe('Iron Man');
    });

    it('return user id', () => {
      expect(userIdSelector('Iron Man | 123456')).toBe('123456');
    });

    it('return title env option boolean value', () => {
      expect(
        makeGetTitleEnvOption()(state, {
          titleEnvOption: 'enable_accounts_export',
        })
      ).toBe(true);
    });
  });
});
