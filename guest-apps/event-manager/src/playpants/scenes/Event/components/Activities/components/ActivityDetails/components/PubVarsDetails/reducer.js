import * as AT from './actionTypes';

export const PUBVARS_INITIAL_STATE = {
  variableSets: [],
  selectedValues: {
    context: null,
    group_id: null,
    namespace: null,
  },
};

export default (state = PUBVARS_INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.GET_PUBVARS:
      return {
        ...state,
      };
    case AT.GET_PUBVARS_SUCCESS: {
      return {
        ...state,
        variableSets: action.data,
      };
    }
    case AT.GET_PUBVARS_FAILED: {
      return {
        ...state,
        variableSets: [],
      };
    }
    case AT.UPDATE_SELECTED_VALUES: {
      return {
        ...state,
        selectedValues: { ...action.data },
      };
    }
    default:
      return state;
  }
};
