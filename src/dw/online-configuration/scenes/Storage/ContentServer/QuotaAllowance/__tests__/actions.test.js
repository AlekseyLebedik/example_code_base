import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('QuotaAllowance', () => {
  const MOCKED_CRITICAL_ERROR = 'MOCKED_CRITICAL_ERROR';
  const MOCKED_NON_CRITICAL_ERROR = 'MOCKED_NON_CRITICAL_ERROR';

  describe('Actions', () => {
    beforeEach(() => {
      CriticalErrorActions.show.mockReset();
      CriticalErrorActions.show.mockReturnValue({
        type: MOCKED_CRITICAL_ERROR,
      });
      nonCriticalHTTPError.mockReset();
      nonCriticalHTTPError.mockReturnValue({
        type: MOCKED_NON_CRITICAL_ERROR,
      });
    });

    describe('fetchQuotaAllowance', () => {
      it('returns STORAGE_QUOTA_ALLOWANCE_FETCH action', () => {
        expect(actions.fetchQuotaAllowance({})).toMatchObject({
          type: AT.STORAGE_QUOTA_ALLOWANCE_FETCH,
          params: {},
          append: false,
        });
      });
    });

    describe('fetchQuotaAllowanceSuccess', () => {
      it('returns STORAGE_QUOTA_ALLOWANCE_FETCH_SUCCESS action', () => {
        const payload = {};
        expect(actions.fetchQuotaAllowanceSuccess(payload)).toMatchObject({
          type: AT.STORAGE_QUOTA_ALLOWANCE_FETCH_SUCCESS,
        });
      });
    });

    describe('fetchQuotaAllowanceFailed', () => {
      it('dispatches CriticalErrorActions show action', () => {
        expect(actions.fetchQuotaAllowanceFailed({})).toAsyncDispatch({
          type: MOCKED_CRITICAL_ERROR,
        });
      });
    });

    describe('quotaAllowanceListItemClick', () => {
      it('returns STORAGE_QUOTA_ALLOWANCE_LIST_ITEM_ONCLICK action', () => {
        expect(actions.quotaAllowanceListItemClick({})).toMatchObject({
          type: AT.STORAGE_QUOTA_ALLOWANCE_LIST_ITEM_ONCLICK,
        });
      });
    });

    describe('openAddModal', () => {
      it('returns STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_OPEN action', () => {
        expect(actions.openAddModal({})).toMatchObject({
          type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_OPEN,
        });
      });
    });

    describe('closeAddModal', () => {
      it('dispatches STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_CLOSE action', () => {
        expect(actions.closeAddModal({})).toMatchObject({
          type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_MODAL_CLOSE,
        });
      });
    });

    describe('addQuotaAllowance', () => {
      it('returns STORAGE_QUOTA_ALLOWANCE_ADD action', () => {
        expect(actions.addQuotaAllowance({})).toMatchObject({
          type: AT.STORAGE_QUOTA_ALLOWANCE_ADD,
        });
      });
    });

    describe('addQuotaAllowanceSuccess', () => {
      it('dispatches STORAGE_QUOTA_ALLOWANCE_ADD_SUCCESS and STORAGE_QUOTA_ALLOWANCE_LIST_ITEM_ONCLICK actions', () => {
        expect(actions.addQuotaAllowanceSuccess({})).toAsyncDispatch(
          { type: AT.STORAGE_QUOTA_ALLOWANCE_ADD_SUCCESS },
          { type: AT.STORAGE_QUOTA_ALLOWANCE_LIST_ITEM_ONCLICK }
        );
      });
    });

    describe('addQuotaAllowanceFailed', () => {
      it('dispatches an nonCriticalHTTPError action', () => {
        expect(actions.addQuotaAllowanceFailed({})).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
