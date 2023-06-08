import gql from 'graphql-tag';
import { makeStyles } from '@material-ui/core/styles';

export const formatRecentInventoryData = data => {
  const inventory = [...data.currencies, ...data.items]
    .sort((a, b) => b.updated - a.updated)
    .slice(0, 3);
  return inventory.reduce(
    (map, { titleId, ...value }) =>
      map.set(titleId, [...(map.get(titleId) || []), value]),
    new Map()
  );
};

export const formatTitleInventoryData = data =>
  data.reduce(
    (map, { titleId, currencies, items }) =>
      currencies.length || items.length
        ? map.set(titleId, { currencies, items })
        : map,
    new Map()
  );

export const formatCurrencyNames = (currencies, platformSelector) =>
  currencies.map(c => ({
    ...c,
    name:
      c?.titleId && platformSelector(c.titleId)
        ? `${c.name} (${platformSelector(c.titleId)} ${c.context})`
        : c.name,
  }));

export const formatItemNames = (items, platformSelector) =>
  items.map(i => ({
    ...i,
    name:
      i?.titleId && platformSelector(i.titleId)
        ? `${i.name} (${platformSelector(i.titleId)} ${i.context})`
        : i.name,
  }));

export const PLAYER_INVENTORY_QUERY = gql`
  query PlayerInventory(
    $unoID: ID!
    $accountsServiceConfigId: ID!
    $titleInventories: Boolean!
    $titleId: Int
    $limit: Int
  ) {
    player(unoId: $unoID, accountsServiceConfigId: $accountsServiceConfigId) {
      id
      inventory(titleId: $titleId) {
        titleInventories @include(if: $titleInventories) {
          titleId
          currencies(limit: $limit) {
            id
            amount
            context
            name
            titleId
            updated
          }
          items(limit: $limit) {
            id
            context
            name
            quantity
            titleId
            updated
          }
        }
        currencies(limit: $limit) @skip(if: $titleInventories) {
          id
          amount
          context
          name
          titleId
          updated
        }
        items(limit: $limit) @skip(if: $titleInventories) {
          id
          context
          name
          quantity
          titleId
          updated
        }
      }
    }
  }
`;

export const useStyles = makeStyles(theme => ({
  gridContainer: {
    marginBottom: 0,
  },
  link: {
    color: theme.palette.primary.main,
    marginTop: 3,
    marginLeft: -5,
  },
}));
