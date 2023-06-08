import { createSelector } from 'reselect';
import { formatDateTimeSelector } from 'dw/core/helpers/date-time';

const compareRulesets = (a, b) => {
  if (a.status === b.status)
    return a.appliedAt ? b.appliedAt - a.appliedAt : b.createdAt - a.createdAt;
  if (a.status === 'active') return -1;
  if (b.status === 'active') return 1;
  return 0;
};

const formatRuleset = (item, formatDateTime) => ({
  ...item,
  createdAt: formatDateTime(item.createdAt),
  appliedAt: formatDateTime(item.appliedAt),
});

export const itemsSelector = createSelector(
  state => state.Scenes.Matchmaking.items,
  formatDateTimeSelector,
  (items, formatDateTime) => {
    if (!items) return items;
    const newItems = [...items];
    newItems.sort(compareRulesets);
    return newItems.map(item => formatRuleset(item, formatDateTime));
  }
);

export const rulesetDetailsSelector = createSelector(
  state => state.Scenes.Matchmaking.rulesetDetails,
  formatDateTimeSelector,
  (item, formatDateTime) => (item ? formatRuleset(item, formatDateTime) : item)
);

export const selectedItemSelector = createSelector(
  (_, props) => props.match.params.id,
  itemsSelector,
  (id, items) => (items ? items.find(item => item.id === id) : undefined)
);
