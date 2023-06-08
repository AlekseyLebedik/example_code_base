import mockState from 'playpants/testUtils/mockState';
import reducer, { INITIAL_STATE } from '../reducer';
import * as AT from '../actionTypes';

const initialState = {
  ...reducer(undefined, {}),
  ...mockState.Scenes.Event.activity.achievements,
};

describe('Achievement Details reducer', () => {
  it('returns default state', () => {
    const state = reducer(undefined, {});
    expect(state).toMatchSnapshot();
  });

  it('handles AT.CLEAR_RULESETS actions', () => {
    const action = {
      type: AT.CLEAR_RULESET,
    };
    expect(reducer(initialState, action)).toMatchObject({
      rulesetList: {
        ...mockState.Scenes.Event.activity.achievements.rulesetList,
      },
      selectedRuleset: {
        data: {},
        loading: false,
      },
    });
  });

  it('handles AT.CLEAR_ACHIEVEMENTS actions', () => {
    const action = {
      type: AT.CLEAR_ACHIEVEMENTS,
    };
    expect(reducer(initialState, action)).toMatchObject({
      ...INITIAL_STATE,
    });
  });

  it('handles AT.FETCH_RULESET_LIST actions', () => {
    const params = {
      q: 'query',
    };
    const action = {
      type: `${AT.FETCH_RULESET_LIST}_FETCH`,
      params,
    };

    expect(reducer(initialState, action)).toMatchObject({
      ...initialState,
      rulesetList: {
        data: [],
        loading: true,
        params,
      },
    });
  });

  it('handles AT.FETCH_SELECTED_RULESET actions', () => {
    const params = {
      q: 'query',
    };
    const action = {
      type: `${AT.FETCH_SELECTED_RULESET}_FETCH`,
      params,
    };

    expect(reducer(initialState, action)).toMatchObject({
      ...initialState,
      selectedRuleset: {
        data: [],
        loading: true,
        params,
      },
    });
  });
});
