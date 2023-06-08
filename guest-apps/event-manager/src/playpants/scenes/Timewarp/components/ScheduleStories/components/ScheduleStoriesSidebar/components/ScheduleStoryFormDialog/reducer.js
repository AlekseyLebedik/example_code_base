import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import {
  createFetchReducer,
  INITIAL_STATE as FETCH_INITIAL_STATE,
} from '@demonware/devzone-core/helpers/reducers';
import * as AT from './actionTypes';

const categoriesFetchReducer = createFetchReducer(AT.FETCH_CATEGORIES);
const contextsFetchReducer = createFetchReducer(AT.FETCH_CONTEXTS);

const INITIAL_STATE = {
  disabled: true,
  useDefaultOption: false,
};

const contextFieldPropsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.SET_CONTEXT_FIELD_PROPS:
      return {
        ...state,
        ...action.props,
      };
    default:
      return { ...state };
  }
};

const CONTEXT_INITIAL_STATE = {
  categories: FETCH_INITIAL_STATE,
  contexts: FETCH_INITIAL_STATE,
  contextFieldProps: INITIAL_STATE,
};

const resetContextReducer = (state = CONTEXT_INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.RESET_CONTEXT:
      return { ...CONTEXT_INITIAL_STATE };
    default:
      return state;
  }
};

const reducer = reduceReducers(
  combineReducers({
    categories: categoriesFetchReducer,
    contexts: contextsFetchReducer,
    contextFieldProps: contextFieldPropsReducer,
  }),
  resetContextReducer
);

export default reducer;
