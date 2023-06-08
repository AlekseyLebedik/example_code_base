import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { event as api } from 'playpants/services';
import { prettyPrint } from 'playpants/helpers/json';
import {
  handleLoadSaga,
  handleSaveSaga,
} from 'playpants/components/FeedbackWrapper/sagas';
import { eventIdSelector } from 'playpants/scenes/Event/selectors';
import { NEW_ACTIVITY_SETTINGS } from 'playpants/constants/activities';
import { orderedActivitiesSelector } from './selectors';
import * as actions from './actions';
import * as AT from './actionTypes';

import achievementSagas from './components/ActivityDetails/components/AchievementDetails/sagas';
import fileStorageSagas from './components/ActivityDetails/components/FileStorage/sagas';
import PublisherObjectsSagas from './components/ActivityDetails/components/PublisherObjectsDetails/sagas';
import PubVarsSagas from './components/ActivityDetails/components/PubVarsDetails/sagas';
import pyscriptSagas from './components/ActivityDetails/components/PyScriptDetails/sagas';
import thunderpantsSagas from './components/ActivityDetails/components/ThunderpantsDetails/sagas';

const handleLoadingActivitiesSagas = handleLoadSaga([
  AT.CREATE_ACTIVITY,
  AT.DELETE_ACTIVITY,
  AT.UPDATE_ACTIVITY,
]);

const handleSavingActivitiesSagas = handleSaveSaga([
  AT.CREATE_ACTIVITY,
  AT.DELETE_ACTIVITY,
  AT.UPDATE_ACTIVITY,
]);

function* createNewActivityParams(
  type,
  dateType,
  name,
  title_envs = [],
  activity = prettyPrint(NEW_ACTIVITY_SETTINGS[type])
) {
  const [eventId, allActivities] = yield all([
    select(eventIdSelector),
    select(orderedActivitiesSelector),
  ]);
  return {
    eventId,
    payload: {
      type,
      name,
      activity,
      title_envs,
      publish_on: dateType,
      exec_order: allActivities.filter(a => a.publish_on === dateType).length,
    },
  };
}

function* createActivity({ activityType, dateType, callback = () => {} }) {
  try {
    const params = yield createNewActivityParams(activityType, dateType);
    const { data } = yield call(api.createActivity, params);
    callback(data.id);
    yield put(actions.createActivitySuccess(data));
  } catch (e) {
    yield put(actions.createActivityFailed(e));
  }
}

function* duplicateActivity({ activity, titleId }) {
  try {
    const params = yield createNewActivityParams(
      activity.type,
      activity.publish_on,
      activity.name,
      [titleId],
      prettyPrint(activity.activity)
    );
    const { data } = yield call(api.createActivity, params);
    yield put(actions.createActivitySuccess(data));
  } catch (e) {
    yield put(actions.createActivityFailed(e));
  }
}

function* revertActivity({ activity, callback }) {
  try {
    const eventId = yield select(eventIdSelector);
    const { data } = yield call(api.revertActivity, eventId, activity.id);
    callback(data.id);
    yield put(actions.createActivitySuccess(data));
  } catch (e) {
    yield put(actions.createActivityFailed(e));
  }
}

function* deleteActivity({ id }) {
  try {
    const params = {
      eventId: yield select(eventIdSelector),
      activityId: id,
    };
    const { data } = yield call(api.deleteSingleActivity, params);
    yield put(actions.deleteActivitySuccess(data));
  } catch (e) {
    yield put(actions.deleteActivityFailed(e));
  }
}

function* updateActivity({ selectedActivity, eventId }) {
  try {
    const { id, activity } = selectedActivity;
    const params = {
      eventId,
      activityId: id,
      payload: {
        ...selectedActivity,
        activity: prettyPrint(activity),
      },
    };

    const { data } = yield call(api.updateSingleActivity, params);
    yield put(actions.updateActivitySuccess(data));
  } catch (e) {
    yield put(actions.updateActivityFailed(e));
  }
}

function* updateThenRevertActivity({ selectedActivity, callback }) {
  try {
    const { id, activity } = selectedActivity;
    const eventId = yield select(eventIdSelector);
    const params = {
      eventId,
      activityId: id,
      payload: {
        ...selectedActivity,
        activity: prettyPrint(activity),
      },
    };

    const { data: updateData } = yield call(api.updateSingleActivity, params);
    const { data: revertData } = yield call(
      api.revertActivity,
      eventId,
      updateData.id
    );
    callback(revertData.id);
    yield put(actions.createActivitySuccess(revertData));
  } catch (e) {
    yield put(actions.createActivityFailed(e));
  }
}

function* saga() {
  yield takeLatest(AT.CREATE_ACTIVITY, createActivity);
  yield takeLatest(AT.DELETE_ACTIVITY, deleteActivity);
  yield takeLatest(AT.DUPLICATE_ACTIVITY, duplicateActivity);
  yield takeLatest(AT.REVERT_ACTIVITY, revertActivity);
  yield takeLatest(AT.UPDATE_ACTIVITY, updateActivity);
  yield takeLatest(AT.UPDATE_THEN_REVERT_ACTIVITY, updateThenRevertActivity);
}

export default [
  saga,
  getSaga(AT.CONTEXTS_FETCH, api.fetchContexts),
  getSaga(AT.TITLE_ENV_FETCH, api.fetchTitleEnvironment, null),
  handleLoadingActivitiesSagas,
  handleSavingActivitiesSagas,
  ...achievementSagas,
  ...fileStorageSagas,
  ...PublisherObjectsSagas,
  ...PubVarsSagas,
  ...pyscriptSagas,
  ...thunderpantsSagas,
];
