import * as AT from './actionTypes';

export const INITIAL_STATE = {
  conversionRules: [],
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH_SUCCESS:
      return {
        ...state,
        conversionRules: action.conversionRules,
      };
    default:
      return state;
  }
};
