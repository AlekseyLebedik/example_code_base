import { decode } from 'dw/core/helpers/base64';
import * as AT from './actionTypes';

const INITIAL_STATE = {
  rulesets: [],
  nextPageToken: undefined,
  q: undefined,
  selectedRuleset: undefined,
  uploadRulesetModalVisible: false,
  uploadRulesetModalLoading: false,
  RulesetDetail: {
    propagateRulesetModalVisible: false,
    propagateRulesetModalLoading: false,
    checkRulesetModalVisible: false,
    checkRulesetModalLoading: false,
    checkRulesetModalActivating: false,
    checkRulesetFailed: false,
    invalidCurrencyIDs: [],
    invalidItemIDs: [],
    invalidProductIDs: [],
  },
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AT.RULESETS_FETCH_SUCCESS: {
      let { selectedRuleset } = state;
      if (action.q && action.rulesets.length === 0) {
        selectedRuleset = undefined;
      }
      const newLabels = action.rulesets.map(ruleset => ruleset.label);
      return {
        ...state,
        rulesets: action.append
          ? [
              ...state.rulesets.filter(
                ruleset => !newLabels.includes(ruleset.label)
              ),
              ...action.rulesets,
            ]
          : action.rulesets,
        nextPageToken: action.nextPageToken,
        q: action.q,
        selectedRuleset,
      };
    }
    case AT.RULESET_DETAIL_FETCH_SUCCESS:
      return {
        ...state,
        selectedRuleset: {
          ...state.selectedRuleset,
          code: decode(action.code),
        },
      };
    case AT.RULESETS_LIST_ITEM_ONCLICK:
      return {
        ...state,
        selectedRuleset: action.ruleset,
      };
    case AT.RULESETS_LIST_RESET_SELECTED_RULESET:
      return {
        ...state,
        selectedRuleset: undefined,
      };
    case AT.RULESET_OPEN_UPLOAD_MODAL:
      return {
        ...state,
        uploadRulesetModalVisible: true,
      };
    case AT.RULESET_UPLOAD:
      return {
        ...state,
        uploadRulesetModalLoading: true,
      };
    case AT.RULESET_CLOSE_UPLOAD_MODAL:
    case AT.RULESET_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadRulesetModalVisible: false,
        uploadRulesetModalLoading: false,
      };
    case AT.RULESET_UPLOAD_FAILED:
      return {
        ...state,
        uploadRulesetModalLoading: false,
      };
    case AT.RULESET_OPEN_PROPAGATE_MODAL:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          propagateRulesetModalVisible: true,
        },
      };
    case AT.RULESET_PROPAGATE:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          propagateRulesetModalLoading: true,
        },
      };
    case AT.RULESET_CLOSE_PROPAGATE_MODAL:
    case AT.RULESET_PROPAGATE_SUCCESS:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          propagateRulesetModalVisible: false,
          propagateRulesetModalLoading: false,
        },
      };
    case AT.RULESET_PROPAGATE_FAILED:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          propagateRulesetModalVisible: false,
          propagateRulesetModalLoading: false,
        },
      };
    case AT.RULESET_DELETE_SUCCESS:
      return {
        ...state,
        selectedRuleset: undefined,
      };
    case AT.RULESET_OPEN_CHECK_MODAL:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          checkRulesetModalVisible: true,
          checkRulesetModalActivating: action.activating,
        },
      };
    case AT.RULESET_CHECK:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          checkRulesetModalLoading: true,
        },
      };
    case AT.RULESET_CLOSE_CHECK_MODAL:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          checkRulesetModalVisible: false,
          checkRulesetModalActivating: false,
          invalidCurrencyIDs: [],
          invalidItemIDs: [],
          invalidProductIDs: [],
        },
      };
    case AT.RULESET_CHECK_SUCCESS:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          checkRulesetModalLoading: false,
          invalidCurrencyIDs: action.invalidCurrencyIDs,
          invalidItemIDs: action.invalidItemIDs,
          invalidProductIDs: action.invalidProductIDs,
        },
      };
    case AT.RULESET_CHECK_FAILED:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          checkRulesetModalVisible:
            false || state.RulesetDetail.checkRulesetModalActivating,
          checkRulesetModalLoading: false,
          checkRulesetFailed: true,
        },
      };
    case AT.RULESETS_ACTIVATE:
      return {
        ...state,
        RulesetDetail: {
          ...state.RulesetDetail,
          checkRulesetModalVisible: false,
          checkRulesetModalActivating: false,
          invalidCurrencyIDs: [],
          invalidItemIDs: [],
          invalidProductIDs: [],
        },
      };
    default:
      return state;
  }
};
