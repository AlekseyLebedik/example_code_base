import { createSelector } from 'reselect';

const statisticsSelector = state =>
  state.Scenes.Security.Anticheat.AnticheatStatistics.ByUser
    .anticheatStatistics;

export const anticheatStatisticsSelector = createSelector(
  statisticsSelector,
  anticheatStatistics =>
    anticheatStatistics.map(anticheatStatistic => ({
      ...anticheatStatistic,
      monitoredGroup: [
        anticheatStatistic.monitoredGroupId,
        anticheatStatistic.monitoredGroupName,
      ].join(' '),
    }))
);
