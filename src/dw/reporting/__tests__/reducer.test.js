import * as AT from 'dw/reporting/actionTypes';
import { franchises as franchisesMock } from 'dw/reporting/__mocks__/franchises';

import reducer from '../reducer';

describe('Reporting reducer', () => {
  const initialState = reducer(undefined, {});

  it('returns default state', () => {
    const state = reducer(undefined, {});
    expect(state).toEqual({ franchiseData: {}, franchises: null });
  });

  it('REPORTING_FETCH_FRANCHISES_SUCCESS', () => {
    const action = {
      type: AT.REPORTING_FETCH_FRANCHISES_SUCCESS,
      data: franchisesMock,
    };
    const state = reducer(undefined, action);
    expect(state).toEqual({ ...initialState, franchises: franchisesMock });
  });

  it('REPORTING_FETCH_FRANCHISES_FAILED', () => {
    const action = {
      type: AT.REPORTING_FETCH_FRANCHISES_FAILED,
    };
    const state = reducer(undefined, action);
    expect(state).toEqual({ ...initialState, franchises: [] });
  });

  it('FETCH_FRANCHISE_DATA', () => {
    const action = {
      type: AT.FETCH_FRANCHISE_DATA,
      id: 1,
      start: 111,
      end: 222,
    };
    const state = reducer(undefined, action);
    expect(state).toEqual({
      ...initialState,
      franchiseData: {
        id: 1,
        start: 111,
        end: 222,
        stats: {},
      },
    });
  });

  it('FETCH_FRANCHISE_DATA_SUCCESS', () => {
    const franchiseData = {
      id: 1,
      start: 111,
      end: 222,
      stats: {},
    };
    const statName = 'users-online';
    const data = [
      [1, 2],
      [3, 4],
    ];
    const action = {
      type: AT.FETCH_FRANCHISE_DATA_SUCCESS,
      id: 1,
      statName,
      data,
    };
    const state = reducer({ ...initialState, franchiseData }, action);
    expect(state).toEqual({
      ...initialState,
      franchiseData: {
        ...franchiseData,
        stats: { [statName]: data },
      },
    });
  });
});
