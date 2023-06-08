import {
  FETCH_OBJECT_STATS,
  FETCH_OBJECT_STAT_SUCCESS,
  UPDATE_STATISTIC_VALUE,
  UPDATE_STATISTIC_VALUE_SUCCESS,
  REFRESH_TABLE,
} from './constants';
// TODO Refactor this to use createFetch actions
export const fetchObjectStat = (params = {}) => ({
  type: FETCH_OBJECT_STATS,
  params,
});

export const fetchObjectStatSuccess = payload => ({
  type: FETCH_OBJECT_STAT_SUCCESS,
  payload,
});

export const updateStatValue = params => ({
  type: UPDATE_STATISTIC_VALUE,
  params,
});

export const updateStatValueSuccess = () => ({
  type: UPDATE_STATISTIC_VALUE_SUCCESS,
});

export const refreshTable = () => ({
  type: REFRESH_TABLE,
});
