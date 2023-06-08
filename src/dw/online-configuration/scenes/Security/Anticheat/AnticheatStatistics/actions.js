import * as AT from './actionTypes';

export const changeUserId = userID => ({
  type: AT.ANTICHEAT_STATISTICS_CHANGE_USER_ID,
  userID,
});

export const changeChallengeId = challengeId => ({
  type: AT.ANTICHEAT_STATISTICS_CHANGE_CHALLENGE_ID,
  challengeId,
});

export const changeDate = date => ({
  type: AT.ANTICHEAT_STATISTICS_CHANGE_DATE,
  date,
});
