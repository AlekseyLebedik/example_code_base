import {
  ACCOUNTS_LOOKUP_PREFIX,
  ACCOUNT_DETAILS_PREFIX,
  ACCOUNTS_BANS_PREFIX,
} from './constants';

export const INITIAL_STATE = {
  data: [],
  q: undefined,
  provider: 'uno',
  next: undefined,
  loading: false,
  details: {},
  bans: {},
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACCOUNTS_LOOKUP_PREFIX}_FETCH`:
      return {
        ...state,
        loading: true,
      };
    case `${ACCOUNTS_LOOKUP_PREFIX}_FETCH_SUCCESS`:
      return {
        ...state,
        data: action.append ? [...state.data, ...action.data] : action.data,
        q: action.q,
        provider: action.provider,
        next: action.next,
        loading: false,
      };
    case `${ACCOUNTS_LOOKUP_PREFIX}_FETCH_FAILED`:
      return {
        ...state,
        data: [],
        loading: false,
      };
    case `${ACCOUNT_DETAILS_PREFIX}_FETCH`:
      return {
        ...state,
        details: {
          [action.urlID]: { loading: true },
        },
      };
    case `${ACCOUNT_DETAILS_PREFIX}_FETCH_SUCCESS`:
      return {
        ...state,
        details: {
          [action.data.accountID]: {
            loading: false,
            existsInMarketplace: !!action.data.data.rename_token_count,
            ...action.data.data,
          },
        },
      };
    case `${ACCOUNT_DETAILS_PREFIX}_FETCH_FAILED`:
      return {
        ...state,
        details: {
          [action.data.accountID]: {
            loading: false,
            existsInMarketplace: false,
          },
        },
      };
    case `${ACCOUNTS_BANS_PREFIX}_FETCH`:
      return {
        ...state,
        bans: {},
      };
    case `${ACCOUNTS_BANS_PREFIX}_FETCH_SUCCESS`: {
      const {
        data: { data },
      } = action;
      const bans = data.map(ban => {
        const { linkedBans, titleID, ...rest } = ban;
        return {
          [titleID]: {
            ...rest,
            linkedBans,
            linkedBansID: linkedBans.map(linkedBan => linkedBan.split('-')[1]),
          },
        };
      });
      return {
        ...state,
        bans: Object.assign({}, ...bans),
      };
    }
    case `${ACCOUNTS_BANS_PREFIX}_FETCH_FAILED`:
      return {
        ...state,
        bans: {},
      };
    default:
      return state;
  }
};
