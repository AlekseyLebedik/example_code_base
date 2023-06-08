import * as AT from './actionTypes';

import { sortConflicts } from './helpers';

export const INITIAL_STATE = {
  conflictList: [],
  conflictType: 'all',
  query: '',
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.FETCH_CONFLICTS_SUCCESS: {
      return {
        ...state,
        conflictList: sortConflicts(action.data),
      };
    }
    case AT.SET_CONFLICT_TYPE: {
      return {
        ...state,
        conflictType: action.conflictType,
      };
    }
    case AT.SEARCH_CONFLICTS: {
      return {
        ...state,
        query: action.query,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};
