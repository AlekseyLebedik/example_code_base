import { ACCOUNTS_PII_PREFIX, ACCOUNTS_2FA_PREFIX } from './constants';

export const INITIAL_STATE = {
  pii: {},
  piiLoading: false,
  player2FA: {},
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case `${ACCOUNTS_PII_PREFIX}_FETCH`: {
      return {
        ...state,
        pii: {},
        piiLoading: true,
      };
    }
    case `${ACCOUNTS_PII_PREFIX}_FETCH_SUCCESS`:
    case `${ACCOUNTS_PII_PREFIX}_FETCH_FAILED`: {
      return {
        ...state,
        pii: action.data || {},
        piiLoading: false,
      };
    }
    case `${ACCOUNTS_2FA_PREFIX}_FETCH`:
    case `${ACCOUNTS_2FA_PREFIX}_FETCH_SUCCESS`:
    case `${ACCOUNTS_2FA_PREFIX}_FETCH_FAILED`: {
      return {
        ...state,
        player2FA: action.data || {},
      };
    }
    default:
      return state;
  }
};
