import { call, put, takeLatest } from 'redux-saga/effects';
import * as GlobalSnackBarActions from '@demonware/devzone-core/components/GlobalSnackBar/actions';
// eslint-disable-next-line camelcase
import { fetchConfiguredProjects as API_fetchConfiguredProjects } from 'playpants/services/contacts';
import * as Actions from './actions';
import { CONFIGURED_PROJECTS_FETCH } from './actionTypes';

function* fetchConfiguredProjects(action) {
  const { userTitlesId } = action;
  try {
    const { data } = yield call(API_fetchConfiguredProjects, {
      userTitlesId,
    });
    yield put(
      Actions.fetchConfiguredProjectsSucceed({
        projects: data.results.map(projects => projects.project),
        userTitlesId,
      })
    );
  } catch (e) {
    yield put(GlobalSnackBarActions.show(e.message, 'error'));
  }
}

export default function* saga() {
  yield takeLatest(CONFIGURED_PROJECTS_FETCH, fetchConfiguredProjects);
}
