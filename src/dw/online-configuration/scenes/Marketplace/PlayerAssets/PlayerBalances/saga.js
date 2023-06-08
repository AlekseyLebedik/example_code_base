import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { getPlayerBalances } from 'dw/online-configuration/services/marketplace';

import { PLAYER_BALANCES_PREFIX } from '../constants';

const balancesSaga = getSaga(PLAYER_BALANCES_PREFIX, getPlayerBalances);

export default balancesSaga;
