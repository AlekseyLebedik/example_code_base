import { sagas as pooledFileSagas } from './PooledFiles/sagas';
import { sagas as userFileSagas } from './UserFiles/sagas';
import { sagas as quotaAllowanceSagas } from './QuotaAllowance/sagas';
import { sagas as quotaUsageSagas } from './QuotaUsage/sagas';

export const sagas = [
  ...pooledFileSagas,
  ...userFileSagas,
  ...quotaAllowanceSagas,
  ...quotaUsageSagas,
];
