import { put, call, takeLatest, all, spawn } from 'redux-saga/effects';
import { cloneableGenerator } from '@redux-saga/testing-utils';
import * as api from 'dw/devzone/services/graph';
import { STAT_NAMES } from 'dw/reporting/constants';
import saga, { fetchFranchiseData, fetchStats } from '../saga';
import * as actions from '../actions';
import * as AT from '../actionTypes';

describe('Reporting Dashboard saga', () => {
  const fetchAction = {
    type: AT.FETCH_FRANCHISE_DATA,
    id: 1,
    start: 111,
    end: 222,
  };
  it('saga', () => {
    expect(saga().next().value).toEqual(
      takeLatest(AT.FETCH_FRANCHISE_DATA, fetchFranchiseData)
    );
  });
  describe('fetchFranchiseData', () => {
    const generator = cloneableGenerator(fetchFranchiseData)(fetchAction);
    it('happy flow', () => {
      const gen = generator.clone();
      expect(gen.next().value).toEqual(
        all(
          STAT_NAMES.map(statName =>
            spawn(fetchStats, api.getStatData, statName, fetchAction)
          )
        )
      );
      expect(gen.next().done).toEqual(true);
    });
    it('error flow', () => {
      const gen = generator.clone();
      expect(gen.next().value).toEqual(
        all(
          STAT_NAMES.map(statName =>
            spawn(fetchStats, api.getStatData, statName, fetchAction)
          )
        )
      );
      expect(gen.throw('Error').value).toEqual(
        put(actions.fetchFranchiseDataFailed('Error'))
      );
    });
  });
  describe('fetchStats', () => {
    const statName = 'online-users';
    const generator = cloneableGenerator(fetchStats)(
      api.getStatData,
      statName,
      fetchAction
    );
    it('happy flow', () => {
      const gen = generator.clone();
      expect(gen.next().value).toEqual(
        call(
          api.getStatData,
          statName,
          { resource: 'franchises/1/stats' },
          fetchAction.start,
          fetchAction.end
        )
      );
      expect(gen.next({ data: { series: [] } }).value).toEqual(
        put(
          actions.fetchFranchiseDataSuccess({
            ...fetchAction,
            statName,
            data: { data: [] },
          })
        )
      );
      expect(gen.next().done).toEqual(true);
    });
    it('error flow', () => {
      const gen = generator.clone();
      expect(gen.next().value).toEqual(
        call(
          api.getStatData,
          statName,
          { resource: 'franchises/1/stats' },
          fetchAction.start,
          fetchAction.end
        )
      );
      expect(gen.throw('Error').value).toEqual(
        put(actions.fetchFranchiseDataFailed('Error'))
      );
      expect(gen.next().done).toEqual(true);
    });
  });
});
