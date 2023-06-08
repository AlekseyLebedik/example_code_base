import * as AP_AT from 'abtesting/components/ActionsPanel/actionTypes';
import { determineTestStatus } from 'dw/abtesting-utils';
import { hasData } from 'dw/core/helpers/object';

import * as AT from './actionTypes';

const INITIAL_STATE = {
  test: {},
  propagateShowDetails: false,
  loading: false,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.FETCH_TEST:
      return {
        ...state,
        loading: true,
      };
    case AT.FETCH_TEST_SUCCESS:
      return {
        ...state,
        test: {
          ...action.test,
          status: determineTestStatus(action.test),
        },
        loading: false,
        propagateShowDetails: false,
      };
    case AT.FETCH_TEST_FAILED:
      return {
        ...state,
        loading: false,
      };
    case AT.RESET_TEST:
      return {
        ...state,
        test: {},
        propagateShowDetails: false,
      };
    case AT.PROPAGATE_SHOW_DETAILS:
      return {
        ...state,
        propagateShowDetails: action.propagateShowDetails,
      };
    case AP_AT.CHANGE_TEST_STATUS_SUCCESS: {
      if (!hasData(state.test)) return state;

      const test = {
        ...state.test,
        status: action.status,
      };
      test.status = determineTestStatus(test);
      return {
        ...state,
        test,
      };
    }
    default:
      return state;
  }
};
