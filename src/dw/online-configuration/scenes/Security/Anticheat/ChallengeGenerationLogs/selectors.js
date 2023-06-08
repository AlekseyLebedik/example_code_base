import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const generationLogsSelector = state =>
  state.Scenes.Security.Anticheat.ChallengeGenerationLogs
    .challengeGenerationLogs;

export const challengeGenerationLogsSelector = createSelector(
  generationLogsSelector,
  formatDateTimeSelector,
  (challengeGenerationLogs, formatDateTime) =>
    challengeGenerationLogs.map(challengeGenerationLog => ({
      ...challengeGenerationLog,
      timestamp: formatDateTime(challengeGenerationLog.timestamp),
    }))
);
