import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import { AUDIT_LOGS_PREFIX } from './constants';

export const reducer = createFetchReducer(AUDIT_LOGS_PREFIX);
