import { createSelector } from 'reselect';
import { activitySelector } from 'playpants/scenes/Event/selectors';
import { formatDateTimeSelector } from 'playpants/helpers/dateTime';
import { formatRuleset } from './helpers';

export const achievementsSelector = createSelector(
  activitySelector,
  activity => activity.achievements
);

const rulesetListBaseSelector = createSelector(
  achievementsSelector,
  achievements => achievements.rulesetList
);

export const rulesetListSelector = createSelector(
  rulesetListBaseSelector,
  rulesetListBase => rulesetListBase.data
);

export const rulesetListLoadingSelector = createSelector(
  rulesetListBaseSelector,
  rulesetListBase => rulesetListBase.loading
);

const getSelectedActivityFromProps = (_, props) => props.selectedActivity;

export const rulesetToActivateSelector = createSelector(
  getSelectedActivityFromProps,
  selectedActivity => selectedActivity.activity.ruleset_to_activate
);

export const makeRulesetToDuplicateSelector = () =>
  createSelector(
    getSelectedActivityFromProps,
    selectedActivity => selectedActivity.activity.ruleset_to_duplicate
  );

export const makeRulesetToActivateLabelSelector = () =>
  createSelector(
    rulesetToActivateSelector,
    makeRulesetToDuplicateSelector(),
    (rulesetToActivateBase, rulesetToDuplicate) =>
      rulesetToActivateBase.label || rulesetToDuplicate
  );

const selectedRulesetBaseSelector = createSelector(
  achievementsSelector,
  achievements => achievements.selectedRuleset
);

export const selectedRulesetSelector = createSelector(
  selectedRulesetBaseSelector,
  selectedRulesetBase => selectedRulesetBase.data
);

export const rulesetDetailsSelector = createSelector(
  rulesetToActivateSelector,
  ({ code, ...restOfRuleset }) => restOfRuleset
);

export const makeRulesetDetailsFormattedSelector = () =>
  createSelector(rulesetDetailsSelector, formatDateTimeSelector, formatRuleset);
