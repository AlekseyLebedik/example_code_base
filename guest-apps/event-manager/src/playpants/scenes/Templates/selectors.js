import { createSelector } from 'reselect';

export const templatesSelector = state => state.Scenes.Templates;

/** templates/searchedTemplates */
export const searchedTemplatesSelector = createSelector(
  templatesSelector,
  templatesState => templatesState.searchedTemplates
);

export const searchedTemplatesDataSelector = createSelector(
  searchedTemplatesSelector,
  searchedTemplates => searchedTemplates.data
);

export const searchedTemplatesLoadingSelector = createSelector(
  searchedTemplatesSelector,
  searchedTemplates => searchedTemplates.loading
);

export const searchedTemplatesNextSelector = createSelector(
  searchedTemplatesSelector,
  searchedTemplates => searchedTemplates.next
);

export const searchedTemplatesParamsSelector = createSelector(
  searchedTemplatesSelector,
  searchedTemplates => searchedTemplates.params
);
