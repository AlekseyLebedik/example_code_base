import { createSelector } from 'reselect';

export const variableSetSelector = state =>
  state.Scenes.Storage.PublisherVariables.VariablesSets;

export const isAddModalOpenSelector = createSelector(
  variableSetSelector,
  variableSets => variableSets.isAddModalOpen
);
export const listItemsSelector = createSelector(
  variableSetSelector,
  variableSets => variableSets.entries
);
export const nextPageTokeSelector = createSelector(
  variableSetSelector,
  variableSets => variableSets.nextPageToken
);
export const selectedListItemSelector = createSelector(
  variableSetSelector,
  variableSets => variableSets.selectedListItem
);
export const querySelector = createSelector(
  variableSetSelector,
  variableSets => variableSets.q
);
export const loadingSelector = createSelector(
  variableSetSelector,
  variableSets => variableSets.loading
);
