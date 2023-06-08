import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import {
  mockState,
  DEFAULT_TITLE_CONTEXT,
} from 'dw/core/components/ContextSelector/test-utils';
import { Services } from 'dw/online-configuration/constants';

import * as actions from '../actions';
import * as AT from '../actionTypes';
import { reducer } from '../reducer';
import { getActiveRuleset } from '../selectors';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

const nextPageToken = 'CAE';
const ruleset = {
  activationTimestamp: null,
  lastUpdateTimestamp: 1531216800,
  label: 'stronghold-5',
  codeSignature:
    'v/kWwu8MBe1GGSxK64a3OqKynmKpGJYGlylUMT0asJ+ZHiuonlDAl2igzISRqgMuPWJf/HqCxvAbxuAMxq+YCg==',
  codeHash: '4mhdBfYBdYmeco1ve62h0b6rue8=',
  creationTimestamp: 1530099122,
  isActive: true,
  codeSignatureTimestamp: 1530099122,
};
const achievements = [
  {
    kind: 1,
    name: 'annual_anniversary_login',
    successLimit: 1,
    expiryTriggers: {
      activateAchievement: [],
    },
    multiProgressTarget: {},
    successCooldown: {
      periodParams: {},
      type: 'now',
    },
    progressTarget: null,
    requiresClaim: false,
    requiresActivation: false,
    description:
      'Achievement granted when user logs in during anniversary time frame.',
  },
];

const rulesets = [ruleset];
const payload = { rulesets, nextPageToken };

describe('Achievements - ActiveRuleset', () => {
  describe('Action Creators', () => {
    const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
    const MOCKED_GLOBAL_SNACK_BAR = 'MOCKED_GLOBAL_SNACK_BAR_SHOW';
    let dispatch = null;
    const getState = () =>
      mockState({
        serviceNames: Services.AE,
        titleContext: DEFAULT_TITLE_CONTEXT,
      });

    beforeAll(() => {
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      GlobalSnackBarActions.show.mockReturnValue({
        type: MOCKED_GLOBAL_SNACK_BAR,
      });
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    beforeEach(() => {
      jest.clearAllMocks();
      dispatch = jest.fn();
    });

    it('ACTIVE_RULESET_FETCH', () => {
      actions.fetchActiveRuleset()(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: AT.ACTIVE_RULESET_FETCH,
        params: { context: DEFAULT_TITLE_CONTEXT },
      });
    });

    it('ACTIVE_RULESET_FETCH_SUCCESS', () => {
      const action = actions.fetchActiveRulesetSuccess(payload);
      action.getState = getState;
      expect(action).toAsyncDispatch({
        type: AT.ACTIVE_RULESET_FETCH_SUCCESS,
        activeRuleset: ruleset,
      });
    });

    it('ACTIVE_RULESET_FETCH_SUCCESS no Active Store', () => {
      const rulesetNotActive = {
        ...ruleset,
        isActive: false,
      };
      const action = actions.fetchActiveRulesetSuccess({
        rulesets: [rulesetNotActive],
      });

      expect(action).toAsyncDispatch(
        { type: AT.ACTIVE_RULESET_FETCH_SUCCESS, activeRuleset: null },
        { type: MOCKED_GLOBAL_SNACK_BAR }
      );
    });

    it('fetchActiveRulesetFailed', () => {
      expect(actions.fetchActiveRulesetFailed()).toAsyncDispatch({
        type: MOCKED_CRITICAL_ERROR,
      });
    });

    it('ACTIVE_RULESET_ACHIEVEMENTS_FETCH', () => {
      actions.fetchActiveRulesetAchievements({})(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: AT.ACTIVE_RULESET_ACHIEVEMENTS_FETCH,
        params: { context: DEFAULT_TITLE_CONTEXT },
        append: false,
      });
    });

    it('ACTIVE_RULESET_ACHIEVEMENTS_FETCH_SUCCESS', () => {
      expect(
        actions.fetchActiveRulesetAchievementsSuccess(
          { achievements, nextPageToken },
          true
        )
      ).toMatchObject({
        type: AT.ACTIVE_RULESET_ACHIEVEMENTS_FETCH_SUCCESS,
        achievements,
        nextPageToken,
        append: true,
      });
    });

    it('fetchActiveRulesetAchievementsFailed', () => {
      expect(actions.fetchActiveRulesetAchievementsFailed()).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle ACTIVE_RULESET_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, {
          type: AT.ACTIVE_RULESET_FETCH_SUCCESS,
          activeRuleset: ruleset,
        })
      ).toMatchSnapshot();
    });

    it('handle ACTIVE_RULESET_ACHIEVEMENTS_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(
          undefined,
          actions.fetchActiveRulesetAchievementsSuccess({ achievements: [] })
        )
      ).toMatchSnapshot();
    });

    it('handle ACTIVE_RULESET_ACHIEVEMENTS_FETCH_SUCCESS: achievements and nextPagetoken assignation', () => {
      expect(
        reducer(
          undefined,
          actions.fetchActiveRulesetAchievementsSuccess({
            achievements,
            nextPageToken,
          })
        )
      ).toMatchSnapshot();
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { achievements: [1, 2] },
          actions.fetchActiveRulesetAchievementsSuccess(
            { achievements: [3, 4], nextPageToken },
            false
          )
        )
      ).toMatchSnapshot();
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { achievements: [1, 2] },
          actions.fetchActiveRulesetAchievementsSuccess(
            { achievements: [3, 4], nextPageToken },
            true
          )
        )
      ).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    it('validate getActiveRuleset', () => {
      expect(getActiveRuleset()(payload.rulesets)).toEqual(ruleset);
    });
  });
});
