import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import { Services } from 'dw/online-configuration/constants';
import { mockState } from 'dw/core/components/ContextSelector/test-utils';

import * as actions from '../actions';
import * as AT from '../actionTypes';
import { reducer } from '../reducer';
import { rulesetsFormattedSelector, selectedRuleset } from '../selectors';

jest.mock('@demonware/devzone-core/components/GlobalSnackBar/actions');
jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

const nextPageToken = 'CAE';
const label = 'stronghold-5';
const code = 'Y29kZQ==';
const ruleset = {
  label,
  code,
  activationTimestamp: null,
  lastUpdateTimestamp: 1531216800,
  codeSignature:
    'v/kWwu8MBe1GGSxK64a3OqKynmKpGJYGlylUMT0asJ+ZHiuonlDAl2igzISRqgMuPWJf/HqCxvAbxuAMxq+YCg==',
  codeHash: '4mhdBfYBdYmeco1ve62h0b6rue8=',
  creationTimestamp: 1530099122,
  isActive: true,
  codeSignatureTimestamp: 1530099122,
};
const rulesets = [ruleset];
const payload = { rulesets, nextPageToken };
const rulesetCheckingPayload = {
  invalidCurrencyIDs: [12345678, 12345678],
  invalidItemIDs: [12345678, 12345678],
  invalidProductIDs: [12345678, 12345678],
};
const q = 'blah';
const values = {
  label: 'stronghold-10',
  fileData: {
    file: {},
    base64: 'base64here',
  },
};
const propagateValues = {
  label,
  environment: ['1:cert'],
};
const invalidCurrencyIDs = [12345678, 12345678];
const invalidItemIDs = [12345678, 12345678];
const invalidProductIDs = [12345678, 12345678];

describe('Achievements - Rulesets', () => {
  describe('Action Creators', () => {
    const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
    const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';
    const MOCKED_GLOBAL_SNACK_BAR = 'MOCKED_GLOBAL_SNACK_BAR_SHOW';
    let dispatch = null;
    const getState = () =>
      mockState({
        serviceNames: Services.AE,
        titleContext: 'foo',
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

    it('RULESETS_FETCH', () => {
      actions.fetchRulesets({})(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: AT.RULESETS_FETCH,
        params: { context: 'foo' },
        append: false,
      });
    });

    it('RULESETS_FETCH_SUCCESS', () => {
      expect(
        actions.fetchRulesetsSuccess(payload, { q, append: true })
      ).toAsyncDispatch({
        type: AT.RULESETS_FETCH_SUCCESS,
        rulesets,
        nextPageToken,
        q,
        append: true,
      });
    });

    it('fetchRulesetsFailed', () => {
      expect(actions.fetchRulesetsFailed()).toAsyncDispatch({
        type: MOCKED_CRITICAL_ERROR,
      });
    });

    it('RULESET_DETAIL_FETCH', () => {
      actions.fetchRulesetDetail(label)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: AT.RULESET_DETAIL_FETCH,
        label,
        context: 'foo',
      });
    });

    it('RULESET_DETAIL_FETCH_SUCCESS', () => {
      expect(actions.fetchRulesetDetailSuccess(ruleset)).toMatchObject({
        type: AT.RULESET_DETAIL_FETCH_SUCCESS,
        code,
      });
    });

    it('fetchRulesetDetailFailed', () => {
      expect(actions.fetchRulesetDetailFailed()).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('RULESETS_LIST_ITEM_ONCLICK', () => {
      const action = actions.rulesetsListItemClick(ruleset);
      action.getState = getState;
      expect(action).toAsyncDispatch({
        type: AT.RULESETS_LIST_ITEM_ONCLICK,
        ruleset,
      });
    });

    it('RULESET_UPLOAD', () => {
      actions.uploadRuleset(values)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: AT.RULESET_UPLOAD,
        values,
        context: 'foo',
      });
    });

    it('RULESET_UPLOAD_SUCCESS', () => {
      const action = actions.uploadRulesetSuccess(label);
      action.getState = getState;

      expect(action).toAsyncDispatch(
        { type: AT.RULESET_UPLOAD_SUCCESS },
        { type: MOCKED_GLOBAL_SNACK_BAR },
        {
          type: AT.RULESETS_FETCH,
          params: { q: label, context: 'foo' },
          append: false,
        }
      );
    });

    it('uploadRulesetFailed', () => {
      expect(actions.uploadRulesetFailed()).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('RULESET_OPEN_UPLOAD_MODAL', () => {
      expect(actions.openUploadRulesetModal()).toHaveProperty(
        'type',
        AT.RULESET_OPEN_UPLOAD_MODAL
      );
    });

    it('RULESET_CLOSE_UPLOAD_MODAL', () => {
      expect(actions.closeUploadRulesetModal()).toHaveProperty(
        'type',
        AT.RULESET_CLOSE_UPLOAD_MODAL
      );
    });

    it('propagateRuleset', () => {
      const store = {
        user: { profile: { timezone: 'America/Vancouver' } },
        Scenes: {
          Achievements: { Rulesets: { selectedRuleset: ruleset } },
        },
      };
      const thisDispatch = jest.fn();
      const thisGetState = jest.fn(() => store);
      actions.propagateRuleset(propagateValues)(thisDispatch, thisGetState);

      const expectedRuleset = {
        ...ruleset,
        codeSignatureTimestamp: 'Jun 27, 2018 04:32 am PDT',
        creationTimestamp: 'Jun 27, 2018 04:32 am PDT',
        lastUpdateTimestamp: 'Jul 10, 2018 03:00 am PDT',
      };

      expect(thisDispatch.mock.calls[0]).toEqual([
        {
          type: AT.RULESET_PROPAGATE,
          ruleset: expectedRuleset,
          values: propagateValues,
        },
      ]);
    });

    it('propagateRulesetSuccess', () => {
      const action = actions.propagateRulesetSuccess();

      expect(action).toAsyncDispatch(
        { type: AT.RULESET_PROPAGATE_SUCCESS },
        { type: MOCKED_GLOBAL_SNACK_BAR }
      );
    });

    it('propagateRulesetFailed', () => {
      expect(actions.propagateRulesetFailed()).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('RULESET_OPEN_PROPAGATE_MODAL', () => {
      expect(actions.openPropagateRulesetModal()).toHaveProperty(
        'type',
        AT.RULESET_OPEN_PROPAGATE_MODAL
      );
    });

    it('RULESET_CLOSE_PROPAGATE_MODAL', () => {
      expect(actions.closePropagateRulesetModal()).toHaveProperty(
        'type',
        AT.RULESET_CLOSE_PROPAGATE_MODAL
      );
    });

    it('RULESET_DELETE', () => {
      actions.deleteRuleset({ label }, q)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: AT.RULESET_DELETE,
        values: { label },
        q,
        context: 'foo',
      });
    });

    it('deleteRulesetSuccess', () => {
      const action = actions.deleteRulesetSuccess(q, 1);
      action.getState = getState;

      expect(action).toAsyncDispatch(
        { type: AT.RULESET_DELETE_SUCCESS },
        { type: MOCKED_GLOBAL_SNACK_BAR },
        { type: AT.RULESETS_FETCH, params: { q, context: 'foo' } }
      );
    });

    it('deleteRulesetFailed', () => {
      expect(actions.deleteRulesetFailed()).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('RULESETS_LIST_RESET_SELECTED_RULESET', () => {
      expect(actions.resetSelectedRuleset()).toHaveProperty(
        'type',
        AT.RULESETS_LIST_RESET_SELECTED_RULESET
      );
    });

    it('RULESETS_ACTIVATE', () => {
      actions.activateRuleset(ruleset)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: AT.RULESETS_ACTIVATE,
        ruleset,
        context: 'foo',
      });
    });

    it('activateRulesetSuccess', () => {
      const action = actions.activateRulesetSuccess(label);
      action.getState = getState;

      expect(action).toAsyncDispatch(
        { type: MOCKED_GLOBAL_SNACK_BAR },
        { type: AT.RULESETS_FETCH, params: { context: 'foo' } }
      );
    });

    it('activateRulesetFailed', () => {
      expect(actions.activateRulesetFailed()).toAsyncDispatch({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    it('RULESET_CHECK', () => {
      actions.checkRuleset(label)(dispatch, getState);
      expect(dispatch).toHaveBeenCalledWith({
        type: AT.RULESET_CHECK,
        label,
        context: 'foo',
      });
    });

    it('checkRulesetSuccess', () => {
      expect(actions.checkRulesetSuccess(rulesetCheckingPayload)).toMatchObject(
        {
          type: AT.RULESET_CHECK_SUCCESS,
          invalidCurrencyIDs,
          invalidItemIDs,
          invalidProductIDs,
        }
      );
    });

    it('checkRulesetFailed', () => {
      expect(actions.checkRulesetFailed()).toAsyncDispatch(
        { type: AT.RULESET_CHECK_FAILED },
        { type: MOCKED_GLOBAL_SNACK_BAR }
      );
    });

    it('RULESET_CLOSE_CHECK_MODAL', () => {
      expect(actions.closeCheckRulesetModal()).toHaveProperty(
        'type',
        AT.RULESET_CLOSE_CHECK_MODAL
      );
    });
  });

  describe('Reducer', () => {
    it('return the initial state', () => {
      expect(reducer(undefined, {})).toMatchSnapshot();
    });

    it('handle RULESETS_FETCH_SUCCESS: empty results', () => {
      expect(
        reducer(
          undefined,
          actions.fetchRulesetsSuccess({ rulesets: [] }, { q: undefined })
        )
      ).toMatchSnapshot();
    });

    it('handle RULESETS_FETCH_SUCCESS: rulesets and nextPagetoken assignation', () => {
      expect(
        reducer(undefined, actions.fetchRulesetsSuccess(payload, { q }))
      ).toMatchSnapshot();
    });

    it('Test append = false', () => {
      expect(
        reducer(
          { rulesets: [{ label: 1 }, { label: 2 }] },
          actions.fetchRulesetsSuccess(
            { rulesets: [{ label: 3 }, { label: 4 }], nextPageToken },
            { q, append: false }
          )
        )
      ).toMatchSnapshot();
    });

    it('Test append = true', () => {
      expect(
        reducer(
          { rulesets: [{ label: 1 }, { label: 2 }] },
          actions.fetchRulesetsSuccess(
            { rulesets: [{ label: 3 }, { label: 4 }], nextPageToken },
            { q, append: true }
          )
        )
      ).toMatchSnapshot();
    });

    it('handle RULESET_DETAIL_FETCH_SUCCESS', () => {
      expect(
        reducer(undefined, actions.fetchRulesetDetailSuccess(ruleset))
      ).toMatchSnapshot();
    });

    it('handle RULESETS_LIST_ITEM_ONCLICK', () => {
      expect(
        reducer(undefined, actions.rulesetsListItemClick(ruleset))
      ).toMatchSnapshot();
    });

    it('handle RULESETS_LIST_RESET_SELECTED_RULESET', () => {
      const state = reducer(undefined, actions.rulesetsListItemClick(ruleset));
      expect(reducer(state, actions.resetSelectedRuleset())).toMatchSnapshot();
    });

    it('handle RULESET_OPEN_UPLOAD_MODAL', () => {
      expect(
        reducer(undefined, actions.openUploadRulesetModal())
      ).toMatchSnapshot();
    });

    it('handle RULESET_UPLOAD', () => {
      expect(
        reducer(undefined, actions.uploadRuleset(values))
      ).toMatchSnapshot();
    });

    it('handle RULESET_CLOSE_UPLOAD_MODAL', () => {
      expect(
        reducer(undefined, actions.closeUploadRulesetModal())
      ).toMatchSnapshot();
    });

    it('handle RULESET_UPLOAD_SUCCESS', () => {
      expect(
        reducer(undefined, actions.uploadRulesetSuccess(label))
      ).toMatchSnapshot();
    });

    it('handle RULESET_UPLOAD_FAILED', () => {
      expect(
        reducer(undefined, { type: AT.RULESET_UPLOAD_FAILED })
      ).toMatchSnapshot();
    });

    it('handle RULESET_OPEN_PROPAGATE_MODAL', () => {
      expect(
        reducer(undefined, actions.openPropagateRulesetModal())
      ).toMatchSnapshot();
    });

    it('handle RULESET_PROPAGATE', () => {
      expect(
        reducer(undefined, { type: AT.RULESET_PROPAGATE })
      ).toMatchSnapshot();
    });

    it('handle RULESET_CLOSE_PROPAGATE_MODAL', () => {
      expect(
        reducer(undefined, actions.closePropagateRulesetModal())
      ).toMatchSnapshot();
    });

    it('handle RULESET_PROPAGATE_SUCCESS', () => {
      expect(
        reducer(undefined, { type: AT.RULESET_PROPAGATE_SUCCESS })
      ).toMatchSnapshot();
    });

    it('handle RULESET_PROPAGATE_FAILED', () => {
      const state = reducer(undefined, { type: AT.RULESET_PROPAGATE });

      expect(
        reducer(state, { type: AT.RULESET_PROPAGATE_FAILED })
      ).toMatchSnapshot();
    });

    it('handle RULESET_DELETE', () => {
      expect(
        reducer(undefined, actions.deleteRuleset({ label }))
      ).toMatchSnapshot();
    });

    it('handle RULESET_DELETE_SUCCESS', () => {
      expect(
        reducer(undefined, { type: AT.RULESET_DELETE_SUCCESS })
      ).toMatchSnapshot();
    });

    it('handle RULESET_OPEN_CHECK_MODAL', () => {
      expect(
        reducer(undefined, actions.openCheckRulesetModal())
      ).toMatchSnapshot();
    });

    it('handle RULESET_CHECK', () => {
      expect(
        reducer(undefined, actions.checkRuleset({ label }))
      ).toMatchSnapshot();
    });

    it('handle RULESET_CHECK_SUCCESS', () => {
      expect(
        reducer(undefined, { type: AT.RULESET_CHECK_SUCCESS })
      ).toMatchSnapshot();
    });

    it('handle RULESET_CHECK_FAILED', () => {
      expect(
        reducer(undefined, { type: AT.RULESET_CHECK_FAILED })
      ).toMatchSnapshot();
    });

    it('handle RULESET_CLOSE_CHECK_MODAL', () => {
      expect(
        reducer(undefined, actions.closeCheckRulesetModal())
      ).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    it('validate selectedRuleset', () => {
      const state = {
        user: { profile: { timezone: 'America/Vancouver' } },
        Scenes: {
          Achievements: {
            Rulesets: { selectedRuleset: ruleset },
          },
        },
      };
      const expectedRuleset = {
        ...ruleset,
        codeSignatureTimestamp: 'Jun 27, 2018 04:32 am PDT',
        creationTimestamp: 'Jun 27, 2018 04:32 am PDT',
        lastUpdateTimestamp: 'Jul 10, 2018 03:00 am PDT',
      };
      expect(selectedRuleset(state)).toEqual(expectedRuleset);
    });

    it('validate rulesetsFormattedSelector', () => {
      const state = {
        user: { profile: { timezone: 'America/Vancouver' } },
        Scenes: {
          Achievements: {
            Rulesets: { rulesets },
          },
        },
      };
      const expectedRulesets = [
        {
          ...ruleset,
          codeSignatureTimestamp: 'Jun 27, 2018 04:32 am PDT',
          creationTimestamp: 'Jun 27, 2018 04:32 am PDT',
          lastUpdateTimestamp: 'Jul 10, 2018 03:00 am PDT',
        },
      ];
      expect(rulesetsFormattedSelector(state)).toEqual(expectedRulesets);
    });
  });
});
