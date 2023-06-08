import { createSelector } from 'reselect';

export const collectionSelector = tabState => {
  const stateSelector = () => (!tabState ? [] : tabState.collection);

  return createSelector(stateSelector, collection =>
    collection.map((c, index) => ({ ...c, key: index }))
  );
};
