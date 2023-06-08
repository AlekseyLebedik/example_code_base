import { all } from 'redux-saga/effects';

import userSaga from './modules/user/saga';
import notificationSaga from './modules/notifications/saga';
import contentTypeSaga from './modules/contentType/saga';
import permissionsSaga from './modules/permissions/saga';
import switchesSaga from './modules/switches/saga';
import tasksSaga from './modules/tasks/saga';

const sagas = [
  userSaga,
  permissionsSaga,
  contentTypeSaga,
  switchesSaga,
  notificationSaga,
  tasksSaga,
];

export default function* rootSaga() {
  yield all(sagas.map(saga => saga()));
}
