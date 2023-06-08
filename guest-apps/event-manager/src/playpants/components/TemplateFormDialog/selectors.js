import { createSelector } from 'reselect';

/** General selectors */
export const templateFormDialogSelector = state =>
  state.Components.TemplateFormDialog;

export const isValidNameSelector = createSelector(
  templateFormDialogSelector,
  templateFormDialog => templateFormDialog.isValidName
);
