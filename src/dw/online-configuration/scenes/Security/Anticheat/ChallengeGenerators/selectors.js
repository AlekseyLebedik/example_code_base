import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const generatorsSelector = state =>
  state.Scenes.Security.Anticheat.ChallengeGenerators.challengeGenerators;

export const challengeGeneratorsSelector = createSelector(
  generatorsSelector,
  formatDateTimeSelector,
  (challengeGenerators, formatDateTime) =>
    challengeGenerators.map(challengeGenerator => ({
      ...challengeGenerator,
      config: JSON.stringify(challengeGenerator.config, null, ' '),
      history: JSON.stringify(challengeGenerator.history, null, ' '),
      lastRun: challengeGenerator.lastRun
        ? formatDateTime(challengeGenerator.lastRun)
        : '',
      nextRun: challengeGenerator.nextRun
        ? formatDateTime(challengeGenerator.nextRun)
        : '',
    }))
);
