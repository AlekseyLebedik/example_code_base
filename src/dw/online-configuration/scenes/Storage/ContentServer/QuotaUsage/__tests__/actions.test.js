import { CriticalErrorActions } from 'dw/core/components/CriticalError';
import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('dw/core/components/CriticalError');
jest.mock('@demonware/devzone-core/helpers/errors');

describe('QuotaUsage', () => {
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

    describe('fetchQuotaUsage', () => {
      it('returns STORAGE_QUOTA_USAGE_FETCH action', () => {
        expect(actions.fetchQuotaUsage({})).toMatchObject({
          type: AT.STORAGE_QUOTA_USAGE_FETCH,
          params: {},
          append: false,
        });
      });
    });

    describe('fetchQuotaUsageSuccess', () => {
      it('returns STORAGE_QUOTA_USAGE_FETCH_SUCCESS action', () => {
        const payload = {
          data: [{ id: 1 }],
          nextPageToken: 'ABC',
          columns: ['id'],
          q: 'search',
        };
        expect(actions.fetchQuotaUsageSuccess(payload)).toMatchObject({
          type: AT.STORAGE_QUOTA_USAGE_FETCH_SUCCESS,
          entries: [{ id: 1 }],
          nextPageToken: 'ABC',
          elementsOrder: ['id'],
          q: 'search',
        });
      });
    });

    describe('fetchQuotaUsageFailed', () => {
      it('dispatches CriticalErrorActions show action', () => {
        expect(actions.fetchQuotaUsageFailed({})).toAsyncDispatch({
          type: MOCKED_CRITICAL_ERROR,
        });
      });
    });

    describe('quotaUsageListItemClick', () => {
      it('returns STORAGE_QUOTA_USAGE_LIST_ITEM_ONCLICK action', () => {
        expect(actions.quotaUsageListItemClick({})).toMatchObject({
          type: AT.STORAGE_QUOTA_USAGE_LIST_ITEM_ONCLICK,
        });
      });
    });

    describe('openAddModal', () => {
      it('returns STORAGE_QUOTA_USAGE_ADD_MODAL_OPEN action', () => {
        expect(actions.openAddModal({})).toMatchObject({
          type: AT.STORAGE_QUOTA_USAGE_ADD_MODAL_OPEN,
        });
      });
    });

    describe('closeAddModal', () => {
      it('dispatches STORAGE_QUOTA_USAGE_ADD_MODAL_CLOSE action', () => {
        expect(actions.closeAddModal({})).toMatchObject({
          type: AT.STORAGE_QUOTA_USAGE_ADD_MODAL_CLOSE,
        });
      });
    });

    describe('addQuotaUsage', () => {
      it('returns STORAGE_QUOTA_USAGE_ADD action', () => {
        expect(actions.addQuotaUsage({})).toMatchObject({
          type: AT.STORAGE_QUOTA_USAGE_ADD,
        });
      });
    });

    describe('addQuotaUsageSuccess', () => {
      it('dispatches STORAGE_QUOTA_USAGE_ADD_SUCCESS and STORAGE_QUOTA_USAGE_LIST_ITEM_ONCLICK actions', () => {
        expect(actions.addQuotaUsageSuccess({})).toAsyncDispatch(
          { type: AT.STORAGE_QUOTA_USAGE_ADD_SUCCESS },
          { type: AT.STORAGE_QUOTA_USAGE_LIST_ITEM_ONCLICK }
        );
      });
    });

    describe('addQuotaUsageFailed', () => {
      it('dispatches an nonCriticalHTTPError action', () => {
        expect(actions.addQuotaUsageFailed({})).toAsyncDispatch({
          type: MOCKED_NON_CRITICAL_ERROR,
        });
      });
    });
  });
});
