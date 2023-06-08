import { createSelector } from 'reselect';
import { int } from 'dw/core/components/FormFields/validation';

import { monitoringGroupsSelector } from '../selectors';

const challengesSelector = state =>
  state.Scenes.Security.Anticheat.Challenges.challenges.map(challenge => ({
    ...challenge,
    challengeConditionValue: int(challenge.challengeConditionValue) / 60,
  }));

const challengeSelector = state =>
  state.Scenes.Security.Anticheat.Challenges.currentChallenge;

export const currentChallengeSelector = createSelector(
  challengeSelector,
  challenge => ({
    ...challenge,
    recipientGroups: challenge.recipientGroups.map(
      ([groupId, enforced]) => `${groupId}${enforced ? '' : '*'}`
    ),
    gameModes: challenge.gameModes.join(', '),
  })
);

export const challengesFormattedSelector = createSelector(
  challengesSelector,
  monitoringGroupsSelector,
  (challenges, monitoringGroups) =>
    challenges.map(challenge => ({
      ...challenge,
      recipientGroupsFormatted: challenge.recipientGroups
        .map(
          ([groupId, enforced]) =>
            `${monitoringGroups[groupId]}${enforced ? '' : '(unenforced)'}`
        )
        .join(', '),
    }))
);
