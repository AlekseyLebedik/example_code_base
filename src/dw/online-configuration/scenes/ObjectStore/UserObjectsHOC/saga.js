import { all, call, put, takeEvery } from 'redux-saga/effects';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';

import * as API from 'dw/online-configuration/services/objectStore';
import * as Actions from './actions';
import * as AT from './actionTypes';

function* deleteObject(action, api) {
  try {
    yield call(api, action.userId, action.name, action.context);
    return true;
  } catch (e) {
    return false;
  }
}

function* deleteObjects(action, api) {
  return yield all(
    action.names.reduce(
      (map, name) => ({
        ...map,
        [name]: call(
          deleteObject,
          {
            userId: action.userId,
            name,
            context: action.context,
          },
          api
        ),
      }),
      {}
    )
  );
}

function* deleteUserObjects(action) {
  const results = yield call(deleteObjects, action, API.deleteUserObject);
  yield put(Actions.deleteUserObjectsSuccess(action.userId, results));
}

function* deletePooledObjects(action) {
  const results = yield call(deleteObjects, action, API.deletePooledObject);
  yield put(Actions.deletePooledObjectsSuccess(action.userId, results));
}

function* downloadUserObject(action) {
  const { objectVersion } = action;
  try {
    const { data } = yield call(
      objectVersion === undefined ? API.getUserObject : API.getUserObjectBackup,
      action
    );
    yield put(Actions.downloadUserObjectSuccess(data));
  } catch (e) {
    yield put(Actions.downloadUserObjectFailed(e));
  }
}

function* userObjectRestoreBackup(action) {
  try {
    yield call(API.userObjectRestoreBackup, action);
    yield put(
      Actions.userObjectRestoreBackupSuccess(action.userId, action.name)
    );
  } catch (e) {
    yield put(Actions.userObjectRestoreBackupFailed(e));
  }
}

function* saga() {
  yield takeEvery(AT.USER_OBJECTS_DELETE, deleteUserObjects);
  yield takeEvery(AT.POOLED_OBJECTS_DELETE, deletePooledObjects);
  yield takeEvery(AT.USER_OBJECT_DOWNLOAD, downloadUserObject);
  yield takeEvery(AT.USER_OBJECT_RESTORE_BACKUP, userObjectRestoreBackup);
}

export default [
  saga,
  getSaga(AT.USER_OBJECTS_FETCH, API.getUserObjects, 'objects'),
  getSaga(AT.POOLED_OBJECTS_FETCH, API.getPooledObjects, 'objects'),
];
