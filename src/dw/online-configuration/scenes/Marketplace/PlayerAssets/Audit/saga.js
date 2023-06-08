import { getAuditLogs as ApiFetchAuditLogs } from 'dw/online-configuration/services/marketplace';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';

import { AUDIT_LOGS_PREFIX } from './constants';

const fetchSuccess = (actionPrefix, data, append, dataOrigin, action) => {
  const {
    params: { successCallback },
  } = action;
  successCallback(data[dataOrigin]);
  return { type: `${AUDIT_LOGS_PREFIX}_FETCH_SUCCESS` };
};

export default getSaga(
  AUDIT_LOGS_PREFIX,
  ApiFetchAuditLogs,
  undefined,
  fetchSuccess
);
