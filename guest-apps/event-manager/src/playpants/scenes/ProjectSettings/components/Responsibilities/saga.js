import {
  takeLatest,
  takeEvery,
  call,
  put,
  select,
  all,
} from 'redux-saga/effects';

import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { projectSettings as api } from 'playpants/services';

import { createFetchGroupsSaga } from 'playpants/scenes/ProjectSettings/sagaCreators';
import { OPTION_TYPES } from 'playpants/constants/responsibilities';

import {
  responsibilityGroupsListSelector,
  responsibilityGroupsParamSelector,
} from './selectors';

import * as actions from './actions';
import * as AT from './actionTypes';

import responsibilityGroupsSaga from './components/Groups/saga';
import responsibilityUsersSaga from './components/Users/saga';

const fetchGroupsSaga = createFetchGroupsSaga(AT.FETCH_GROUP_LIST);

const fetchResponsibilityOptionsSaga = getSaga(
  AT.FETCH_RESPONSIBILITY_OPTIONS,
  api.fetchResponsibilityOptions,
  'results'
);

const fetchResponsibilityGroupsSaga = getSaga(
  AT.FETCH_RESPONSIBILITY_GROUPS,
  api.fetchResponsibilityGroups,
  'results'
);

function* updateResponsibilities({ params }) {
  const fetchParams = yield select(responsibilityGroupsParamSelector);
  try {
    yield call(api.updateResponsibilities, params.id, {
      responsibilities: params.data.responsibilities,
    });
    yield put(actions.updateResponsibilitiesSuccess());
    yield put(actions.fetchResponsibilityGroups(fetchParams));
  } catch (e) {
    yield put(actions.updateResponsibilitiesFailed());
  }
}

function* checkMissingResponsibilityGroups() {
  const responsibilityGroups = yield select(responsibilityGroupsListSelector);
  const options = OPTION_TYPES;
  const { user, group, project } = yield select(
    responsibilityGroupsParamSelector
  );

  const allOptions = options.map(
    ({ env_type: envType, option_type: optionType }) => ({
      envType,
      optionType,
    })
  );

  const groupOptions = responsibilityGroups.map(
    ({ env_type: envType, option_type: optionType }) => ({
      envType,
      optionType,
    })
  );

  const difference = allOptions.filter(
    ({ envType: env1, optionType: option1 }) =>
      !groupOptions.some(
        ({ envType: env2, optionType: option2 }) =>
          env2 === env1 && option2 === option1
      )
  );

  if (difference) {
    yield all(
      difference.map(({ envType, optionType }) =>
        put(
          actions.createResponsibilityGroups({
            user,
            group,
            project,
            envType,
            optionType,
          })
        )
      )
    );
  }
}

function* createResponsibilityGroups({ params }) {
  const { envType, group = null, optionType, project, user = null } = params;
  try {
    const { data } = yield call(api.createResponsibilityGroups, {
      env_type: envType,
      group,
      option_type: optionType,
      project,
      user,
    });

    yield put(actions.createResponsibilityGroupsSuccess(data));
  } catch (e) {
    yield put(actions.createResponsibilityGroupsFailed(e));
  }
}

function* reponsibilityGroupsSaga() {
  yield takeLatest(
    `${AT.FETCH_RESPONSIBILITY_GROUPS}_FETCH_SUCCESS`,
    checkMissingResponsibilityGroups
  );
  yield takeLatest(AT.UPDATE_RESPONSIBILITIES, updateResponsibilities);
  yield takeEvery(AT.CREATE_RESPONSIBILITY_GROUPS, createResponsibilityGroups);
}

export default [
  ...responsibilityGroupsSaga,
  ...responsibilityUsersSaga,
  fetchGroupsSaga,
  fetchResponsibilityGroupsSaga,
  fetchResponsibilityOptionsSaga,
  reponsibilityGroupsSaga,
];
