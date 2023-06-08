import * as AT from './actionTypes';

const INITIAL_STATE = {
  functions: [],
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.FUNCTIONS_FETCH_SUCCESS:
      return {
        ...state,
        functions: action.functions,
      };
    case AT.FUNCTION_DELETE_SUCCESS:
      return {
        ...state,
        functions: state.functions.filter(
          item => !action.functionIds.includes(item.functionId)
        ),
      };
    default:
      return state;
  }
};

export default reducer;
