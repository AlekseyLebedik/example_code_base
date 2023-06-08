import { createSelector } from 'reselect';
import {
  colorSettingsSelector,
  allProjectTitlesSelector,
} from '../App/selectors';
import { getTitleNameSubstring } from '../App/helpers';
import { DEFAULT_COLOR } from './constants';

export const projectColorsSelector = createSelector(
  colorSettingsSelector,
  allProjectTitlesSelector,
  (colorSettings, titles) =>
    titles.map(({ id, name }) => ({
      title: id,
      name: getTitleNameSubstring({ name }),
      color: colorSettings.some(setting => setting.title === id)
        ? colorSettings.find(setting => setting.title === id).color
        : DEFAULT_COLOR,
    }))
);
