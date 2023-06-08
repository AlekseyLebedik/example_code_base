import { call, put, takeLatest } from 'redux-saga/effects';

import {
  getServerLogs as ApiFetchServerLogs,
  exportServerLogs as ApiExportServerLogs,
} from 'dw/online-configuration/services/debugging';
import * as Actions from './actions';
import {
  SERVER_LOGS_FETCH,
  SERVER_LOGS_FETCH_DETAILS,
  SERVER_LOGS_EXPANDED_FETCH,
  SERVER_LOGS_EXPORT,
} from './actionTypes';

const prepareQuery = ({
  error,
  warning,
  debug,
  info,
  webservice,
  marketplace,
  mmp3,
  lsg,
  auth3,
  abtesting,
  loginqueue,
  objectstore,
  dwsproxy,
  achievements_engine: achievementsEngine,
  'tournament-engine': tournamentEngine,
  commsservice,
  'loot-generation': lootGeneration,
  'storage-script-service': storageScriptService,
  uno,
  umbrella,
  ...query
}) => {
  const level = { error, warning, debug, info };
  const sources = {
    lsg,
    achievements_engine: achievementsEngine,
    marketplace,
    mmp3,
    dwsproxy,
    abtesting,
    loginqueue,
    objectstore,
    auth3,
    webservice,
    commsservice,
    uno,
    umbrella,
    'loot-generation': lootGeneration,
    'tournament-engine': tournamentEngine,
    'storage-script-service': storageScriptService,
  };
  const serializedLevel = Object.entries(level)
    .filter(item => item[1])
    .map(([logLevel]) => logLevel)
    .join(',');
  const serializedSources = Object.entries(sources)
    .filter(item => item[1])
    .map(item => item[0])
    .join(',');
  return {
    ...query,
    level: serializedLevel || undefined,
    sources: serializedSources || undefined,
  };
};

function* fetchServerLogs(action) {
  const { successCallback, failCallback } = action.params;
  try {
    const { data } = yield call(ApiFetchServerLogs, {
      ...prepareQuery(action.filters),
      nextPageToken: action.nextPageToken,
    });
    if (successCallback) successCallback(data.data, data.nextPageToken);
  } catch (e) {
    if (failCallback) failCallback(e);
    yield put(Actions.fetchServerLogsFailed(e));
  }
}

function* fetchDetails(action) {
  const { params, append } = action;
  try {
    const { data } = yield call(ApiFetchServerLogs, prepareQuery(params));
    yield put(Actions.fetchDetailsSuccess(data, append, params.transId));
  } catch (e) {
    yield put(Actions.fetchServerLogsFailed(e, params));
  }
}

function* fetchServerLogsExpanded(action) {
  const { params, msgId } = action;
  try {
    const { data } = yield call(
      ApiFetchServerLogs,
      prepareQuery(params),
      msgId
    );
    let { nextPageToken } = data;
    const aggrData = [...data.data];
    while (!aggrData.map(item => item.id).includes(msgId)) {
      const response = yield call(ApiFetchServerLogs, {
        ...prepareQuery(params),
        nextPageToken,
      });
      // eslint-disable-next-line prefer-destructuring
      nextPageToken = response.data.nextPageToken;
      aggrData.push(...response.data.data);
    }
    yield put(Actions.fetchServerLogsExpandedSuccess(aggrData, msgId));
  } catch (e) {
    yield put(Actions.fetchServerLogsFailed(e, params));
  }
}

function* exportServerLogs(action) {
  const { fileType, query } = action;
  try {
    const { data } = yield call(ApiExportServerLogs, {
      fileType,
      ...prepareQuery(query),
    });
    yield put(
      Actions.exportServerLogsSuccess({
        fileData: data,
        fileName: `server-logs.${fileType}`,
      })
    );
  } catch (e) {
    yield put(Actions.exportServerLogsFailed(e));
  }
}

function* saga() {
  yield takeLatest(SERVER_LOGS_FETCH, fetchServerLogs);
  yield takeLatest(SERVER_LOGS_FETCH_DETAILS, fetchDetails);
  yield takeLatest(SERVER_LOGS_EXPANDED_FETCH, fetchServerLogsExpanded);
  yield takeLatest(SERVER_LOGS_EXPORT, exportServerLogs);
}

export default saga;
