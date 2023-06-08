import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { getCurrencies } from 'dw/online-configuration/services/marketplace';

import { STORE_BALANCES_PREFIX } from '../constants';

const currenciesSaga = getSaga(STORE_BALANCES_PREFIX, getCurrencies);

export default currenciesSaga;
