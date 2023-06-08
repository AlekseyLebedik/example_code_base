import { getSaga } from '@demonware/devzone-core/helpers/sagas';
import { getPlayerItems } from 'dw/online-configuration/services/marketplace';

import { PLAYER_ITEMS_PREFIX } from '../constants';

const playerItems = getSaga(PLAYER_ITEMS_PREFIX, getPlayerItems);

export default playerItems;
