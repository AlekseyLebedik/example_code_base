import { makeHasFeaturesEnabledSelector as makeHasFeaturesEnabledSelectorBase } from 'dw/core/components/ConfigFeatureFlags/selectors';

export const sourceSelector = state => {
  const { currentProject, currentTitle } = state.Components.TitleSelector || {};
  return { project: currentProject, title: currentTitle };
};

export const makeHasFeaturesEnabledSelector = () =>
  makeHasFeaturesEnabledSelectorBase(sourceSelector);
