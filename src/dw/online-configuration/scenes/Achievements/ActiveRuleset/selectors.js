import { createSelector } from 'reselect';

export const getActiveRuleset = () =>
  createSelector(
    state => state,
    rulesets => rulesets.find(ruleset => ruleset.isActive)
  );
