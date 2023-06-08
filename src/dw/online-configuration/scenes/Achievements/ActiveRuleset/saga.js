import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from 'dw/online-configuration/services/achievements';
import * as Actions from './actions';
import {
  ACTIVE_RULESET_FETCH,
  ACTIVE_RULESET_ACHIEVEMENTS_FETCH,
} from './actionTypes';

function* fetchActiveRuleset(action) {
  const { params } = action;
  try {
    const { data } = yield call(API.getRulesets, params);
    let { nextPageToken } = data;
    const rulesets = [...data.rulesets];
    while (!rulesets.some(r => r.isActive) && nextPageToken !== null) {
      const response = yield call(API.getRulesets, {
        ...params,
        nextPageToken,
      });
      ({ nextPageToken } = response.data);
      rulesets.push(...response.data.rulesets);
    }
    yield put(Actions.fetchActiveRulesetSuccess({ rulesets }));
  } catch (e) {
    yield put(Actions.fetchActiveRulesetFailed(e));
  }
}

function* fetchActiveRulesetAchievements(action) {
  const {
    params: {
      updateRulesetData,
      successCallback,
      failCallback,
      activeCheck = () => true,
      ...params
    },
  } = action;
  try {
    let { data } = yield call(API.getAchievements, params);
    // update ruleset data into player achievements table as soon as recieved
    if (updateRulesetData)
      updateRulesetData(data.achievements, !data.nextPageToken);
    if (successCallback) successCallback(data.achievements, data.nextPageToken);
    else {
      let achievements = [...data.achievements];
      while (data.nextPageToken && activeCheck()) {
        ({ data } = yield call(API.getAchievements, {
          ...params,
          nextPageToken: data.nextPageToken,
        }));
        achievements = [...achievements, ...data.achievements];
        // update ruleset data into player achievements table as soon as recieved
        if (updateRulesetData && activeCheck())
          updateRulesetData(data.achievements, !data.nextPageToken);
      }
      yield put(
        Actions.fetchActiveRulesetAchievementsSuccess({ achievements })
      );
    }
  } catch (e) {
    yield put(Actions.fetchActiveRulesetAchievementsFailed(e));
    if (failCallback) failCallback();
  }
}

function* saga() {
  yield takeLatest(ACTIVE_RULESET_FETCH, fetchActiveRuleset);
  yield takeLatest(
    ACTIVE_RULESET_ACHIEVEMENTS_FETCH,
    fetchActiveRulesetAchievements
  );
}

export default saga;
