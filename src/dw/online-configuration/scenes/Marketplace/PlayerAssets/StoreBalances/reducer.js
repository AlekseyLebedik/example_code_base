import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';

import { STORE_BALANCES_PREFIX } from '../constants';

export const currenciesReducer = createFetchReducer(STORE_BALANCES_PREFIX);
