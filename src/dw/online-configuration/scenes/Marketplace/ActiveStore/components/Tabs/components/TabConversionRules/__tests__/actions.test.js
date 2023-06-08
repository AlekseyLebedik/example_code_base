import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import { Services } from 'dw/online-configuration/constants';
import {
  mockState,
  DEFAULT_TITLE_CONTEXT,
} from 'dw/core/components/ContextSelector/test-utils';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('@demonware/devzone-core/helpers/errors');

describe('TabConversionRules', () => {
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchConversionRules', () => {
      it('returns ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH action', () => {
        const dispatch = jest.fn();
        const getState = () =>
          mockState({ serviceNames: Services.Marketplace });
        actions.fetchConversionRules()(dispatch, getState);
        expect(dispatch).toHaveBeenCalledWith({
          type: AT.ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH,
          context: DEFAULT_TITLE_CONTEXT,
        });
      });
    });

    describe('fetchConversionRulesSuccess', () => {
      it('dispatches ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH_SUCCESS action', () => {
        expect(
          actions.fetchConversionRulesSuccess({ data: [{ id: 1 }, { id: 2 }] })
        ).toAsyncDispatch({
          type: AT.ACTIVE_STORE_TAB_CONVERSION_RULES_FETCH_SUCCESS,
          conversionRules: [{ id: 1 }, { id: 2 }],
        });
      });
    });

    describe('fetchConversionRulesFailed', () => {
      it('dispatches NonCriticalError show action', () => {
        const action = actions.fetchConversionRulesFailed(Error());
        expect(action).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
