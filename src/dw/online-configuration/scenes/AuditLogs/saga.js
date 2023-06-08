import { getAuditLogs as ApiFetchAuditLogs } from 'dw/online-configuration/services/auditlogs';
import { getSaga } from '@demonware/devzone-core/helpers/sagas';

import { AUDIT_LOGS_PREFIX } from './constants';

export default getSaga(AUDIT_LOGS_PREFIX, ApiFetchAuditLogs);
