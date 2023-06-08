import { nonCriticalHTTPError } from '@demonware/devzone-core/helpers/errors';
import * as AT from './actionTypes';

export const fetchAnticheatStatistics = (params, append = false) => ({
  type: AT.ANTICHEAT_STATISTICS_FETCH,
  params,
  append,
});

export const fetchAnticheatStatisticsSuccess = (payload, append) => ({
  type: AT.ANTICHEAT_STATISTICS_FETCH_SUCCESS,
  payload,
  append,
});

export const fetchAnticheatStatisticsFailed = err => dispatch =>
  dispatch(nonCriticalHTTPError(err));
