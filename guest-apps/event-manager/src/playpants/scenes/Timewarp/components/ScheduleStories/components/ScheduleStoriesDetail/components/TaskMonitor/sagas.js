import delay from '@redux-saga/delay-p';
import { call, put, race, select, take, takeLatest } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { stories as storiesApi, tasks as tasksApi } from 'playpants/services';
import * as selectors from 'playpants/components/TaskMonitorComponents/selectors';
import { taskMonitorSelector } from './selectors';
import * as actions from './actions';
import * as AT from './actionTypes';

function* selectedTaskDetailFetch(id) {
  while (true) {
    const taskDetail = yield select(
      selectors.taskMonitorTaskDetailDataSelector(taskMonitorSelector)
    );
    if (isEmpty(taskDetail) || taskDetail.state === 'in-progress') {
      yield put(actions.fetchTaskDetails(id));
    }
    yield delay(5000);
  }
}

function* taskDetailFetchWatcher() {
  while (true) {
    const { id } = yield take(AT.START_SELECTED_TASK_DETAIL_FETCH);
    yield race({
      task: call(selectedTaskDetailFetch, id),
      cancel: take(AT.STOP_SELECTED_TASK_DETAIL_FETCH),
    });
  }
}

function* updateStoryTasks(action) {
  const { data: taskDetail } = action;
  const tasksData = yield select(
    selectors.taskMonitorTasksDataSelector(taskMonitorSelector)
  );
  const updatedTasks = tasksData.map(task => {
    if (task.id === taskDetail.id) {
      return {
        ...task,
        ...taskDetail,
      };
    }
    return task;
  });
  yield put(actions.updateStoryTasks(updatedTasks));
}

function* saga() {
  yield takeLatest(`${AT.FETCH_TASK_DETAILS}_FETCH_SUCCESS`, updateStoryTasks);
}

export default [
  saga,
  taskDetailFetchWatcher,
  getSaga(AT.FETCH_STORY_TASKS, storiesApi.fetchStoryTasks, 'results'),
  getSaga(AT.FETCH_TASK_DETAILS, tasksApi.fetchTaskDetails, null),
];
