import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const logsSelector = state =>
  state.Scenes.Security.Anticheat.ChallengeLogs.challengeLogs;

export const challengeLogsSelector = createSelector(
  logsSelector,
  formatDateTimeSelector,
  (challengeLogs, formatDateTime) =>
    challengeLogs.map(challengeLog => ({
      ...challengeLog,
      timestamp: formatDateTime(challengeLog.timestamp),
    }))
);
