import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const fields = [
  'lastUpdateTimestamp',
  'activationTimestamp',
  'creationTimestamp',
  'codeSignatureTimestamp',
];

const formatRuleset = (ruleset, formatDateTime) => {
  if (!ruleset) return ruleset;
  const newRuleset = { ...ruleset };
  fields.forEach(field => {
    const value = newRuleset[field];
    newRuleset[field] = Number.isInteger(value) ? formatDateTime(value) : value;
  });
  return newRuleset;
};

const rulesetsStateSelector = state => state.Scenes.Achievements.Rulesets;

const selectedRulesetSelector = createSelector(
  rulesetsStateSelector,
  ({ selectedRuleset }) => selectedRuleset
);

export const selectedRuleset = createSelector(
  selectedRulesetSelector,
  formatDateTimeSelector,
  formatRuleset
);

const sortRulesetsFunc = (a, b) => {
  if (a.isActive) {
    return -1;
  }
  if (b.isActive) {
    return 1;
  }
  if (a.lastUpdateTimestamp > b.lastUpdateTimestamp) {
    return -1;
  }
  return 1;
};

const rulesetsSelector = createSelector(
  rulesetsStateSelector,
  ({ rulesets }) => rulesets
);

export const rulesetsFormattedSelector = createSelector(
  rulesetsSelector,
  formatDateTimeSelector,
  (rulesets, formatDateTime) =>
    rulesets
      .sort(sortRulesetsFunc)
      .map(ruleset => formatRuleset(ruleset, formatDateTime))
);

export const invalidCurrencyIDsSelector = createSelector(
  rulesetsStateSelector,
  ({ RulesetDetail }) => RulesetDetail.invalidCurrencyIDs
);
export const invalidItemIDsSelector = createSelector(
  rulesetsStateSelector,
  ({ RulesetDetail }) => RulesetDetail.invalidItemIDs
);
export const invalidProductIDsSelector = createSelector(
  rulesetsStateSelector,
  ({ RulesetDetail }) => RulesetDetail.invalidProductIDs
);
export const uploadRulesetModalStateSelector = createSelector(
  rulesetsStateSelector,
  ({ uploadRulesetModalVisible, uploadRulesetModalLoading }) => ({
    visible: uploadRulesetModalVisible,
    loading: uploadRulesetModalLoading,
  })
);
export const propagateRulesetModalStateSelector = createSelector(
  rulesetsStateSelector,
  ({ RulesetDetail }) => ({
    visible: RulesetDetail.propagateRulesetModalVisible,
    loading: RulesetDetail.propagateRulesetModalLoading,
  })
);
export const checkRulesetModalStateSelector = createSelector(
  rulesetsStateSelector,
  ({ RulesetDetail }) => ({
    visible: RulesetDetail.checkRulesetModalVisible,
    loading: RulesetDetail.checkRulesetModalLoading,
    activating: RulesetDetail.checkRulesetModalActivating,
    failed: RulesetDetail.checkRulesetFailed,
  })
);
