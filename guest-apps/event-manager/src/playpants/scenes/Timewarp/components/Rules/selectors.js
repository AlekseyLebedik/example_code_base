import { createSelector } from 'reselect';

export const rulesSelector = state => state.Scenes.Timewarp.rules;

export const clientRulesSchemaSelector = createSelector(
  rulesSelector,
  rules => rules.clientRulesSchema
);

export const clientRulesSchemaDataSelector = createSelector(
  clientRulesSchemaSelector,
  clientRulesSchema => clientRulesSchema.data
);
