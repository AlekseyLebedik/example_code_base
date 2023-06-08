import { combineReducers } from 'redux';
import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import reduceReducers from 'reduce-reducers';
import * as AT from './actionTypes';

const INITIAL_STATE = {
  rulesetList: {
    data: [],
    loading: false,
  },
  selectedRuleset: {
    data: {},
    loading: false,
  },
};

const rulesetListFetchReducer = createFetchReducer(AT.FETCH_RULESET_LIST);

const selectedRulesetFetchReducer = createFetchReducer(
  AT.FETCH_SELECTED_RULESET
);

const rulesetListReducer = (state = INITIAL_STATE.rulesetList, action) => {
  switch (action.type) {
    case `${AT.FETCH_RULESET_LIST}_FETCH_FAILED`:
      return {
        ...INITIAL_STATE.rulesetList,
      };
    default:
      return {
        ...rulesetListFetchReducer(state, action),
      };
  }
};

const selectedRulesetReducer = (
  state = INITIAL_STATE.selectedRuleset,
  action
) => {
  switch (action.type) {
    case `${AT.FETCH_SELECTED_RULESET}_FETCH_FAILED`:
      return {
        ...INITIAL_STATE.selectedRuleset,
      };
    default:
      return {
        ...selectedRulesetFetchReducer(state, action),
      };
  }
};

const clearAchievementsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.CLEAR_ACHIEVEMENTS: {
      return {
        ...INITIAL_STATE,
      };
    }
    case AT.CLEAR_RULESET: {
      return {
        ...state,
        selectedRuleset: { ...INITIAL_STATE.selectedRuleset },
      };
    }
    default:
      return state;
  }
};

const reducer = reduceReducers(
  clearAchievementsReducer,
  combineReducers({
    rulesetList: rulesetListReducer,
    selectedRuleset: selectedRulesetReducer,
  })
);

export default reducer;
