import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import * as AT from './actionTypes';
import { dataSelector, seriesNamesSelector } from './selectors';

export const clearChart = statName => ({
  type: AT.STAT_CLEAR_CHART,
  statName,
});

export const fetchStatsData = (statName, source, props = {}) => ({
  type: AT.STAT_DATA_FETCH,
  statName,
  source,
  props,
});

export const fetchStatsDataSuccess = (response, statName, props) => {
  const { start, end } = props;
  const initial = start === undefined && end === undefined;
  const type = initial
    ? AT.STAT_DATA_INITIAL_FETCH_SUCCESS
    : AT.STAT_DATA_FETCH_SUCCESS;
  const data = dataSelector(response);
  const series = seriesNamesSelector(response);
  const action = {
    type,
    statName,
    data,
    series,
    start,
    end,
  };
  if (initial) {
    action.navigatorData = dataSelector(response, initial);
  }
  return action;
};

export const fetchStatsDataFailed = statName => dispatch => {
  dispatch({
    type: AT.STAT_DATA_FETCH_FAILED,
    statName,
  });
  dispatch(
    GlobalSnackBarActions.show(
      `Failed to load data for ${statName}. See logs for details.`,
      'error'
    )
  );
};
