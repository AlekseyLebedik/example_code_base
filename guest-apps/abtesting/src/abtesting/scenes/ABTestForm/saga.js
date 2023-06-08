import { all, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';

import { getFormError } from 'dw/core/helpers/form-error';

import * as Services from 'abtesting/services/abtests';
import { createApiUrl } from 'dw/core/helpers/services';

import * as Actions from './actions';
import {
  SAVE_CONFIG,
  FETCH_SEGMENTS,
  FETCH_CATEGORIES,
  FETCH_FIRST_PARTIES,
  FETCH_COHORT_USERS,
  DELETE_COHORT_USERS,
  DELETE_SEGMENTS,
  FETCH_CONFIGS,
  SAVE_TEST,
} from './actionTypes';

function* fetchSegments(action) {
  try {
    const context = action.context.split(':');
    const { data } = yield call(Services.getSegments, {
      url: createApiUrl('abtesting/segments', context[0], context[1]),
    });
    yield put(Actions.fetchSegmentsSuccess(data, action.context));
  } catch (e) {
    yield put(Actions.fetchSegmentsFailed(e, action.context));
  }
}

function* fetchCategories(action) {
  try {
    const context = action.context.split(':');
    const [titleID, environment] = context;
    const { data } = yield call(Services.fetchResourceByUrl, {
      url: createApiUrl('abtesting/categories', titleID, environment),
    });
    yield put(
      Actions.fetchCategoriesSuccess({ ...data, context: action.context })
    );
  } catch (e) {
    yield put(Actions.fetchCategoriesFailed(e));
  }
}

function* fetchFirstParties(action) {
  try {
    const context = action.context.split(':');
    const [titleID, environment] = context;
    const { data } = yield call(Services.fetchResourceByUrl, {
      url: createApiUrl('abtesting/first-parties', titleID, environment),
    });
    yield put(
      Actions.fetchFirstPartiesSuccess({ ...data, context: action.context })
    );
  } catch (e) {
    yield put(Actions.fetchFirstPartiesFailed(e));
  }
}

function* fetchCohortUsers(action) {
  const { cohortID } = action;
  try {
    const context = action.context.split(':');
    const [titleID, environment] = context;
    const { data } = yield call(
      Services.getCohortUsers,
      createApiUrl(
        `abtesting/tests/${action.testID}/cohorts/${cohortID}/users`,
        titleID,
        environment
      )
    );
    yield put(Actions.fetchCohortUsersSuccess(data, cohortID));
  } catch (e) {
    yield put(Actions.fetchCohortUsersFailed(e, cohortID));
  }
}

function* deleteCohortUsers(action) {
  const { cohortID } = action;
  try {
    const context = action.context.split(':');
    const [titleID, environment] = context;
    yield call(
      Services.deleteCohortUsers,
      createApiUrl(
        `abtesting/tests/${action.testID}/cohorts/${cohortID}/users`,
        titleID,
        environment
      )
    );
    yield put(Actions.deleteCohortUsersSuccess(cohortID));
  } catch (e) {
    yield put(Actions.deleteCohortUsersFailed(e));
  }
}

function* deleteSegments(action) {
  const { segmentIDs } = action;
  try {
    const context = action.context.split(':');
    const [titleID, environment] = context;
    const deleteCohortSegments = () =>
      segmentIDs.map(segmentID =>
        call(
          Services.deleteSegment,
          createApiUrl(`abtesting/segments/${segmentID}`, titleID, environment)
        )
      );
    yield all(deleteCohortSegments());
    yield put(Actions.deleteSegmentsSuccess(action.context, segmentIDs));
  } catch (e) {
    yield put(Actions.deleteSegmentsFailed(e));
  }
}

function* fetchConfigs(action) {
  try {
    const context = action.context.split(':');
    const [titleID, environment] = context;
    const { data } = yield call(Services.getConfigs, {
      url: createApiUrl('abtesting/configs', titleID, environment),
    });
    yield put(Actions.fetchConfigsSuccess(data, action.context));
  } catch (e) {
    yield put(Actions.fetchConfigsFailed(e, action.context));
  }
}

function* saveConfig(action) {
  try {
    const context = action.context.split(':');
    const [titleID, environment] = context;
    const update = action.values.configID !== undefined;
    if (!update) {
      const { data } = yield call(Services.addConfig, {
        url: createApiUrl('abtesting/configs', titleID, environment),
        values: action.values,
      });
      yield action.onAdd({
        configID: data.configID,
        configName: action.values.name,
      });
      // eslint-disable-next-line
      action.values.configID = data.configID;
    } else {
      yield call(Services.updateConfig, {
        url: createApiUrl(
          `abtesting/configs/${action.values.configID}`,
          titleID,
          environment
        ),
        values: action.values,
      });
    }
    yield put(Actions.saveConfigSuccess(action.context, action.values, update));
    yield put(action.resolve());
  } catch (e) {
    const validationErrors = getFormError(e);
    if (validationErrors === undefined) {
      yield put(Actions.saveConfigFailed(e));
    } else {
      action.reject(new SubmissionError(validationErrors));
    }
  }
}

function* uploadManualSourceFile(titleID, environment, testID, values) {
  let { cohorts } = values;
  const refetchTest = cohorts.some(
    c => c.source === 'manual' && c.fileData && c.cohortID === undefined
  );
  if (refetchTest) {
    const { data } = yield call(
      Services.getTest,
      createApiUrl(`abtesting/tests/${testID}`, titleID, environment)
    );
    const { cohorts: fetchedCohorts } = data;
    cohorts = fetchedCohorts.map((cohort, index) => ({
      ...cohort,
      fileData: cohorts[index].fileData,
      source: cohorts[index].source,
    }));
  }

  const addFunctions = cohorts.map(c => {
    if (c.source === 'manual' && c.fileData) {
      const batchUrl = createApiUrl(
        `abtesting/tests/${testID}/cohorts/${c.cohortID}/users/$batch`,
        titleID,
        environment
      );
      return call(Services.addCohortUsersBatch, {
        url: batchUrl,
        fileData: c.fileData.base64,
      });
    }
    return null;
  });
  yield all(addFunctions);
}

function* saveTest(action) {
  try {
    const { context, ...values } = action.data;
    const ctx = context.split(':');
    const [titleID, environment] = ctx;
    let testID;
    let newTest = true;
    if (action.testID === undefined) {
      if (action.newCohorts) {
        values.cohorts = action.newCohorts;
      }
      if (action.nonMatchingConfigs) {
        for (
          let index = 0;
          index < action.nonMatchingConfigs.length;
          index += 1
        ) {
          const nonMatchingConfig = action.nonMatchingConfigs[index];
          const { data } = yield call(Services.addConfig, {
            url: createApiUrl('abtesting/configs', titleID, environment),
            values: nonMatchingConfig,
          });
          yield put(
            Actions.saveConfigSuccess(
              context,
              { ...nonMatchingConfig, configID: data.configID },
              false
            )
          );
          yield put(Actions.notifyCopyOfConfigurations(nonMatchingConfig));
          values.cohorts = values.cohorts.map(cohort => ({
            ...cohort,
            treatments: cohort.treatments.map(treatment => ({
              ...treatment,
              configs: treatment.configs.map(config => {
                if (nonMatchingConfig.configID === config.configID) {
                  return {
                    configID: data.configID,
                    configName: nonMatchingConfig.name,
                  };
                }
                return config;
              }),
            })),
          }));
        }
      }
      const { data } = yield call(Services.addTest, {
        url: createApiUrl('abtesting/tests', titleID, environment),
        values,
      });
      ({ testID } = data);
    } else {
      ({ testID } = action);
      newTest = false;
      yield call(Services.updateTest, {
        url: createApiUrl(`abtesting/tests/${testID}`, titleID, environment),
        values,
      });
    }
    try {
      yield uploadManualSourceFile(titleID, environment, testID, values);
      yield put(Actions.saveTestSuccess(action.history));
    } catch (e) {
      if (newTest) {
        yield put(
          Actions.uploadManualSourceFileFailed(
            e,
            action.history,
            titleID,
            environment,
            testID
          )
        );
      }
      throw e;
    }
  } catch (e) {
    yield put(Actions.saveTestFailed(e));
    const validationErrors = getFormError(e);
    if (validationErrors !== undefined) {
      action.reject(new SubmissionError(validationErrors));
    }
  }
}

function* saga() {
  yield takeLatest(FETCH_SEGMENTS, fetchSegments);
  yield takeLatest(FETCH_CATEGORIES, fetchCategories);
  yield takeLatest(FETCH_FIRST_PARTIES, fetchFirstParties);
  yield takeEvery(FETCH_COHORT_USERS, fetchCohortUsers);
  yield takeLatest(DELETE_COHORT_USERS, deleteCohortUsers);
  yield takeLatest(DELETE_SEGMENTS, deleteSegments);
  yield takeLatest(FETCH_CONFIGS, fetchConfigs);
  yield takeLatest(SAVE_CONFIG, saveConfig);
  yield takeLatest(SAVE_TEST, saveTest);
}

export default saga;
