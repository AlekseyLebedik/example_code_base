import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('Achievement Details actions', () => {
  it('returns FETCH_RULESET_LIST action', () => {
    const params = {
      title: 1,
      env: 'dev',
    };
    expect(actions.fetchRulesetList(params)).toMatchObject({
      type: `${AT.FETCH_RULESET_LIST}_FETCH`,
      params,
    });
  });

  it('returns FETCH_SELECTED_RULESET action', () => {
    const params = {
      title: 1,
      env: 'dev',
      label: 'stronghold-0',
    };
    expect(actions.fetchSelectedRuleset(params)).toMatchObject({
      type: `${AT.FETCH_SELECTED_RULESET}_FETCH`,
      params,
    });
  });

  it('returns CLEAR_RULESETS action', () => {
    expect(actions.clearRuleset()).toMatchObject({
      type: AT.CLEAR_RULESET,
    });
  });

  it('returns CLEAR_ACHIEVEMENTS action', () => {
    expect(actions.clearAchievements()).toMatchObject({
      type: AT.CLEAR_ACHIEVEMENTS,
    });
  });
});
