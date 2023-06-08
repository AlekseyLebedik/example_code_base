import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import * as AT from './actionTypes';

export const fetchChallengeLogs = (params, append = false) => ({
  type: AT.SECURITY_CHALLENGE_LOGS_FETCH,
  params,
  append,
});

export const fetchChallengeLogsSuccess = (payload, append) => ({
  type: AT.SECURITY_CHALLENGE_LOGS_FETCH_SUCCESS,
  challengeLogs: payload.data,
  nextPageToken: payload.nextPageToken,
  append,
});

export const fetchChallengeLogsFailed = (err, params, append) => dispatch =>
  dispatch(
    CriticalErrorActions.show(err, () => fetchChallengeLogs(params, append))
  );

export const challengeLogsListItemClick = challengeLog => ({
  type: AT.SECURITY_CHALLENGE_LOGS_LIST_ITEM_ONCLICK,
  log: challengeLog,
});
