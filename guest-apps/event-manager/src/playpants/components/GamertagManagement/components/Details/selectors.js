import { createSelector } from 'reselect';
import { groupListSelector } from '../../selectors';

/** For getting selected item */
export const selectedItemIdSelector = (_, props) => props.selectedItemId;

const selectItemFn = (id, items) =>
  items && id
    ? items.find(item => item.id.toString() === id.toString())
    : undefined;

const createSelectedItemSelector = list =>
  createSelector(selectedItemIdSelector, list, selectItemFn);

export const makeSelectedItemSelector = () =>
  createSelectedItemSelector(groupListSelector);
