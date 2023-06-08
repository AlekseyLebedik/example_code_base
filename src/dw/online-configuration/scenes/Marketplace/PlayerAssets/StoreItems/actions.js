import { selectItems } from '../actions';
import { STORE_ITEMS_PREFIX } from '../constants';

export const selectStoreItems = selectItems(STORE_ITEMS_PREFIX);
