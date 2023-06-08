import { CriticalErrorActions } from 'dw/core/components/CriticalError';

import { actions as GlobalProgressActions } from '@demonware/devzone-core/components/GlobalProgress';
import * as AT from './actionTypes';

export const fetchChallengeGenerationLogs = (params, append = false) => ({
  type: AT.CHALLENGE_GENERATION_LOGS_FETCH,
  params,
  append,
});

export const fetchChallengeGenerationLogsSuccess = (payload, append) => ({
  type: AT.CHALLENGE_GENERATION_LOGS_FETCH_SUCCESS,
  challengeGenerationLogs: payload.data,
  nextPageToken: payload.nextPageToken,
  filteringEnabled: payload.filteringEnabled,
  append,
});

export const fetchChallengeGenerationLogsFailed = (err, action) => dispatch => {
  dispatch(GlobalProgressActions.done());
  dispatch(CriticalErrorActions.show(err, () => action));
};

export const onSearchParamsChange = q => ({
  type: AT.CHALLENGE_GENERATION_LOGS_CHANGE_SEARCH_QUERY,
  q,
});

export const onOrderChange = order => ({
  type: AT.CHALLENGE_GENERATION_LOGS_CHANGE_ORDER,
  order,
});
