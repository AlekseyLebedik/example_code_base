import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import download from 'downloadjs';
import {
  startSubmit,
  stopSubmit,
  setSubmitSucceeded,
  SubmissionError,
} from 'redux-form';

import {
  fetchFailed,
  fetchSuccess,
} from '@demonware/devzone-core/helpers/actions';
import * as API from 'dw/online-configuration/services/objectStore';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
import ModalHandlers from 'dw/core/components/ModalHandlers';
import { getFormError } from 'dw/core/helpers/form-error';

import { FORM_NAME as ADD_FILE_FORM_NAME } from 'dw/core/components/ObjectStore/UploadAction/components/AddFileForm/constants';
import { FORM_NAME as PROPAGATE_OBJECTS_FORM_NAME } from 'dw/core/components/ObjectStore/PropagateAction/components/PropagateObjectsForm/constants';

import { OBJECT_STORE_BROWSER_DOWNLOAD_CONTENT_URL_ENABLED } from '@demonware/devzone-core/access/FeatureSwitchesCheck/featureSwitches';
import { hasFeaturesEnabledFuncSelector } from '@demonware/devzone-core/access/FeatureSwitchesCheck/selectors';
import { BASE_URL } from 'dw/config';
import * as Actions from './commonActions';
import {
  OBJECTS_DELETE,
  OBJECT_DOWNLOAD,
  UPLOAD_OBJECT,
  OBJECT_PROMOTE,
  PROPAGATE_OBJECTS,
} from './actionTypes';

import { OBJECTS_LIST_PREFIX } from './constants';

function* deleteObject(action) {
  try {
    yield call(
      API.deletePublisherObjectIW,
      action.name,
      action.groupID,
      action.params
    );
    return true;
  } catch (e) {
    return false;
  }
}

function* deleteObjects(action) {
  const { params = {} } = action;
  const { successCallback, context } = params;
  try {
    const results = yield all(
      action.objects.reduce((mergedObj, obj) => {
        // eslint-disable-next-line no-param-reassign
        mergedObj[`${obj.name}:${obj.objectID}`] = call(deleteObject, {
          name: obj.name,
          groupID: obj.groupID,
          params: { context },
        });
        return mergedObj;
      }, {})
    );
    if (successCallback) successCallback();
    yield put(Actions.deleteObjectsSuccess(results));
    yield put(
      GlobalSnackBarActions.show(
        `This amount of ${action.objects.length} objects was deleted`,
        'success'
      )
    );
  } catch (e) {
    yield put(
      GlobalSnackBarActions.show(
        e.response ? e.response.data.error.msg : e.toString(),
        'error'
      )
    );
  }
}

const downloadObjectFromContentURL = async (contentURL, name) => {
  try {
    await fetch(contentURL, {
      Origin: BASE_URL,
    }).then(response => {
      response.blob().then(blob => download(blob, name));
      return response.status;
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log('Unable to download object: ', err);
    return err;
  }
  return null;
};

function* downloadObject(action) {
  const isContentURLEnabled = yield select(state =>
    hasFeaturesEnabledFuncSelector(state)(
      [OBJECT_STORE_BROWSER_DOWNLOAD_CONTENT_URL_ENABLED],
      false
    )
  );
  if (isContentURLEnabled && action.acl === 'public') {
    try {
      downloadObjectFromContentURL(action.contentURL, action.name);
      yield put(Actions.downloadObjectSuccess());
    } catch (e) {
      yield put(Actions.downloadObjectFailed(e));
    }
  } else {
    try {
      const { data } = yield call(
        API.getPublisherObject,
        action.name,
        action.groupID,
        action.params,
        action.acl
      );
      yield put(Actions.downloadObjectSuccess());
      download(data.fileData, action.name);
    } catch (e) {
      yield put(Actions.downloadObjectFailed(e));
    }
  }
}

function* promoteObject(action) {
  const {
    groupID,
    params: { successCallback, ...params },
  } = action;
  try {
    yield call(API.promotePublisherGroups, action.name, groupID, params);
    if (successCallback) successCallback();
    yield put(
      GlobalSnackBarActions.show(
        `${action.name} object was promoted.`,
        'success'
      )
    );
  } catch (e) {
    yield put(
      GlobalSnackBarActions.show(
        e.response ? e.response.data.error.msg : e.toString(),
        'error'
      )
    );
  }
}

function* uploadObject(action) {
  const {
    displayProgress,
    config: {
      params: { successCallback, context },
    },
    cancelSource,
  } = action;
  try {
    yield put(startSubmit(ADD_FILE_FORM_NAME));
    if (displayProgress) {
      yield put(Actions.startUploadProgress(action.data, cancelSource));
      yield put(ModalHandlers.close(ADD_FILE_FORM_NAME));
    }
    yield call(API.putPublisherObject, action.data, { context });
    if (successCallback) successCallback();
    yield put(setSubmitSucceeded(ADD_FILE_FORM_NAME));
    if (displayProgress) {
      yield put(Actions.stopUploadProgress(action.data));
    } else {
      yield put(ModalHandlers.close(ADD_FILE_FORM_NAME));
    }
  } catch (e) {
    const validationErrors = e.response && getFormError(e);
    if (validationErrors) {
      yield put(stopSubmit(ADD_FILE_FORM_NAME, validationErrors));
      yield put(Actions.failUploadProgress(action.data, validationErrors));
    } else {
      const error = e.response ? e.response.data.error.msg : e.toString();
      yield put(GlobalSnackBarActions.show(error, 'error'));
      yield put(
        Actions.failUploadProgress(action.data, {
          error:
            "Please try again but do note that the file you're uploading may be too large.",
        })
      );
    }
  }
}
function* fetchObjects(action) {
  const { successCallback, failCallback, ...params } = action.params;
  try {
    const { data } = yield call(API.getPublisherObjects, params);
    let { nextPageToken } = data;
    if (successCallback) successCallback(data.objects);
    while (nextPageToken !== null) {
      const response = yield call(API.getPublisherObjects, {
        ...params,
        nextPageToken,
      });
      // eslint-disable-next-line prefer-destructuring
      nextPageToken = response.data.nextPageToken;
      if (successCallback) successCallback(response.data.objects);
    }

    // Put the fetchSuccess call in here to trigger loading to equal
    // false when fetching is done, just passing {} as the payload
    // here since successCallback handles uploading the table
    yield put(fetchSuccess(OBJECTS_LIST_PREFIX, {}, false));
  } catch (e) {
    if (failCallback) failCallback();
    yield put(fetchFailed(OBJECTS_LIST_PREFIX, e));
  }
}

function* propagateObjects(action) {
  const {
    values: {
      context,
      environment: { key: tagretEnv, label: targetEnvLabel },
      objects,
      groupID,
      acl,
    },
    sourceEnv: { shortType: sourceEnvironment, title: sourceTitle },
    sourceContext,
    resolve,
    reject,
  } = action;
  const newObjects = acl ? objects.map(obj => ({ ...obj, acl })) : objects;

  try {
    yield put(startSubmit(PROPAGATE_OBJECTS_FORM_NAME));
    const { data } = yield call(
      API.propagatePublisherObjects,
      tagretEnv,
      {
        objects: newObjects,
        sourceEnvironment,
        sourceTitle,
        sourceContext,
        targetGroupID: groupID,
      },
      { context: context[tagretEnv] }
    );
    yield put(ModalHandlers.close(PROPAGATE_OBJECTS_FORM_NAME));
    resolve();
    yield put(Actions.propagateObjectsSuccess(data, targetEnvLabel));
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors) {
      reject(new SubmissionError(validationErrors));
    } else {
      yield put(GlobalSnackBarActions.show(e.toString(), 'error'));
    }
  }
}

export default function* saga() {
  yield takeLatest(`${OBJECTS_LIST_PREFIX}_FETCH`, fetchObjects);
  yield takeLatest(OBJECTS_DELETE, deleteObjects);
  yield takeEvery(OBJECT_DOWNLOAD, downloadObject);
  yield takeLatest(OBJECT_PROMOTE, promoteObject);
  yield takeEvery(UPLOAD_OBJECT, uploadObject);
  yield takeLatest(PROPAGATE_OBJECTS, propagateObjects);
}
