import { createFetchReducer } from '@demonware/devzone-core/helpers/reducers';
import { PLAYER_BALANCES_PREFIX } from '../constants';

export const playerBalancesReducer = createFetchReducer(PLAYER_BALANCES_PREFIX);
