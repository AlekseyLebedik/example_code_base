import { createSelector } from 'reselect';
import toLower from 'lodash/toLower';
import { globalSettingsSelector } from 'playpants/components/App/selectors';

export const scheduleStoryFormDialogSelector = state =>
  state.Scenes.Timewarp.scheduleStories.ScheduleStoriesSidebar
    .scheduleStoryFormDialog;

export const contextsSelector = createSelector(
  scheduleStoryFormDialogSelector,
  scheduleStoryFormDialog => scheduleStoryFormDialog.contexts
);

export const contextsDataSelector = createSelector(
  contextsSelector,
  contexts => contexts.data
);

export const contextsLoadingSelector = createSelector(
  contextsSelector,
  contexts => contexts.loading
);

export const contextFieldPropsSelector = createSelector(
  scheduleStoryFormDialogSelector,
  scheduleStoryFormDialog => scheduleStoryFormDialog.contextFieldProps
);

export const useDefaultOptionSelector = createSelector(
  contextFieldPropsSelector,
  contextFieldProps => contextFieldProps.useDefaultOption
);

/**
 * The context options based on the stored contexts data
 *
 * - if using default option, return all options
 * - if not, filter options
 */
export const contextOptionsSelector = createSelector(
  contextsDataSelector,
  useDefaultOptionSelector,
  (contextsData, useDefaultOption) => {
    const filteredContextOptions = contextsData.filter(context => {
      if (useDefaultOption) return context;
      const isUserSelectableTitle =
        context.userSelectable && toLower(context.type) === 'title';
      const isUserSelectableAny =
        context.userSelectable && toLower(context.type) === 'any';
      return isUserSelectableTitle || isUserSelectableAny;
    });

    const contextOptions = filteredContextOptions.map(context => ({
      label: context.name,
      value: context.id,
    }));
    return contextOptions;
  }
);

/**
 * Disables context field
 */
export const disableContextFieldSelector = createSelector(
  contextFieldPropsSelector,
  contextFieldProps => contextFieldProps.disabled
);

/**
 * Hides the context field
 */
export const showContextFieldSelector = createSelector(
  globalSettingsSelector,
  globalSettings => globalSettings.is_multicontext
);

/**
 * Object Store Categories
 */
export const categoriesSelector = createSelector(
  scheduleStoryFormDialogSelector,
  scheduleStoryFormDialog => scheduleStoryFormDialog.categories
);

export const categoriesDataSelector = createSelector(
  categoriesSelector,
  categories => categories.data
);

export const categoriesLoadingSelector = createSelector(
  categoriesSelector,
  categories => categories.loading
);

export const categoryOptionsSelector = createSelector(
  categoriesDataSelector,
  categoriesData =>
    categoriesData.map(category => ({
      label: category.name,
      value: category.name,
    }))
);
