import { getAuditLogs } from 'dw/audit/services/auditlogs';
import { call, takeLatest } from 'redux-saga/effects';

import { AUDIT_LOGS_PREFIX } from './constants';

function* fetchAuditLogs(action) {
  const {
    params: { successCallback, failCallback, q: _, ...params },
  } = action;
  try {
    const {
      data: { data, nextPageToken: newNextPageToken },
    } = yield call(getAuditLogs, params);

    if (successCallback) successCallback(data, newNextPageToken);
  } catch (e) {
    if (failCallback) failCallback();
  }
}

function* saga() {
  yield takeLatest(`${AUDIT_LOGS_PREFIX}_FETCH`, fetchAuditLogs);
}

export default saga;
