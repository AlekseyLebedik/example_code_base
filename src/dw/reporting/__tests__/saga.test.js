import { put, call, takeLatest } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import * as api from 'dw/reporting/services';
import saga, { fetchFranchises } from '../saga';
import * as actions from '../actions';
import * as AT from '../actionTypes';

jest.mock('../actions');

describe('Reporting saga', () => {
  it('saga', () => {
    expect(saga().next().value).toEqual(
      takeLatest(AT.REPORTING_FETCH_FRANCHISES, fetchFranchises)
    );
  });
  describe('fetchFranchises', () => {
    const generator = cloneableGenerator(fetchFranchises)({
      type: AT.REPORTING_FETCH_FRANCHISES,
    });
    it('happy flow', () => {
      actions.fetchFranchisesSucceed.mockReturnValue({
        type: AT.REPORTING_FETCH_FRANCHISES_SUCCESS,
      });
      const gen = generator.clone();
      expect(gen.next().value).toEqual(call(api.fetchFranchises, undefined));
      expect(gen.next({ data: {} }).value).toEqual(
        put(actions.fetchFranchisesSucceed())
      );
      expect(gen.next().done).toEqual(true);
    });
    it('error flow', () => {
      actions.fetchFranchisesFail.mockReturnValue({
        type: AT.REPORTING_FETCH_FRANCHISES_FAILED,
      });
      const gen = generator.clone();
      expect(gen.next().value).toEqual(call(api.fetchFranchises, undefined));
      expect(gen.throw('Not Found').value).toEqual(
        put(actions.fetchFranchisesFail())
      );
      expect(gen.next().done).toEqual(true);
    });
  });
});
