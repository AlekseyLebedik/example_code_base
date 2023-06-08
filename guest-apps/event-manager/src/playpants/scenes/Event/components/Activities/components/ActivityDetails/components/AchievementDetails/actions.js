import { createFetch } from '@demonware/devzone-core/helpers/actions';
import * as AT from './actionTypes';

export const fetchRulesetList = (params = {}) =>
  createFetch(
    AT.FETCH_RULESET_LIST,
    null,
    { ...params, sort: 'label' },
    params.nextPage
  );

export const fetchSelectedRuleset = (params = {}) =>
  createFetch(AT.FETCH_SELECTED_RULESET, null, { ...params }, params.nextPage);

export const clearAchievements = () => ({
  type: AT.CLEAR_ACHIEVEMENTS,
});

export const clearRuleset = () => ({
  type: AT.CLEAR_RULESET,
});
