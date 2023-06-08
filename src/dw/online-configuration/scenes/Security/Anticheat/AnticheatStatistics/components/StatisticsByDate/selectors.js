import { createSelector } from 'reselect';
import { DATE_TIME_FORMATS, formatDateTime } from 'dw/core/helpers/date-time';

const statisticsSelector = state =>
  state.Scenes.Security.Anticheat.AnticheatStatistics.ByDate
    .anticheatStatistics;

export const anticheatStatisticsSelector = createSelector(
  statisticsSelector,
  anticheatStatistics =>
    anticheatStatistics.map(anticheatStatistic => ({
      ...anticheatStatistic,
      date: formatDateTime(
        anticheatStatistic.date,
        DATE_TIME_FORMATS.DEFAULT_DATE
      ),
    }))
);
