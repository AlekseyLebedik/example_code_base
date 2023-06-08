import { RARITY_TYPES, CATEGORIES, tabs, subtabs } from './constants';

const parseType = type => type && parseInt(type, 10);

export const itemSubTypeSelector = type =>
  RARITY_TYPES[parseType(type)] || type;

export const itemTypeSelector = (type, typeCategories = []) =>
  typeCategories[type] || CATEGORIES[parseType(type)] || type;

export const selectedTabSelector = (_, props) =>
  props.match.params.tab || tabs.inventory;

export const selectedSubtabSelector = (_, props) =>
  props.match.params.subtab || subtabs.items;

export const storeItemsSelector = state =>
  state.Scenes.Marketplace.Player.StoreInventory.data;

export const itemsSelector = state => state.data;
export const userIdSelector = (_, props) => props.match.params.userId;
export const isClanSelector = (_, props) => {
  const {
    match: {
      params: { inventoryType },
    },
  } = props;
  return inventoryType === 'clan-inventory';
};

export const storeLabelSelector = state =>
  state.Scenes.Marketplace.StoreConfig.store
    ? state.Scenes.Marketplace.StoreConfig.store.label
    : undefined;

export const formatItem = (item, storeItem, typeCategories = []) => {
  if (!storeItem) return null;
  const itemType = storeItem.itemType || 0;
  const itemSubType = storeItem.itemSubType || 0;
  return {
    key: item.itemID,
    ...item,
    ...storeItem,
    itemType,
    itemSubType,
    rarity: itemSubTypeSelector(itemSubType),
    nameType: itemTypeSelector(itemType, typeCategories),
  };
};

export const filterItemsMappingSelector = (
  items,
  storeItems,
  typeCategories
) => {
  let results = [];
  if (storeItems && storeItems.length > 0) {
    results = items
      .map(item => {
        const storeItem = storeItems.find(i => i.itemID === item.itemID);
        return formatItem(item, storeItem, typeCategories);
      })
      .filter(x => x);
  }
  return results;
};

export const filteredInvalidItemsSelector = (items, storeItems) => {
  if (storeItems && storeItems.length > 0) {
    const storeItemIds = storeItems.map(item => item.itemID);
    return items.filter(item => !storeItemIds.includes(item.itemID));
  }
  return null;
};
