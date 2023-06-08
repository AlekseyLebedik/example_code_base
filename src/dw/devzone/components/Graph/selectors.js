import { createSelector } from 'reselect';
import hexToRgba from 'hex-rgba';

import { COLORS, COLORS_MAP } from './constants';

const graphsSelector = state => state.graph.graphs;

const graphSelector = createSelector(
  graphsSelector,
  graphs => name => graphs[name]
);

const dataSelector = (response, initial) => {
  const { series } = response;
  if (!initial) return series;

  let total = series.find(s => [s.name, s.id].includes('total'));
  if (total === undefined) {
    total = series.length > 0 ? series[0] : { data: [] };
  }
  return total.data;
};

const enabledSeriesSelector = createSelector(
  state => state,
  series =>
    series
      .filter(el => el.visible)
      .map(el => el.id)
      .join(':')
);

const seriesNamesSelector = response => {
  const { series = [] } = response;
  return series.map(s => s.name);
};

const idSelector = el =>
  (el.userOptions && el.userOptions.id) || el.id || el.name;

const findSeries = (line, series) =>
  series.find(el => idSelector(el) === idSelector(line));

const sourceSelector = createSelector(
  props => props,
  source =>
    typeof source === 'string' || source instanceof String
      ? { withTitleEnv: false, resource: source }
      : source
);

const getColorSelector = createSelector(
  state => state,
  ({ idx, name }) => {
    if (COLORS_MAP[name.toLowerCase()]) return COLORS_MAP[name.toLowerCase()];
    const alpha = 100 - Math.floor(idx / COLORS.length) * 20;
    return hexToRgba(COLORS[idx % COLORS.length], alpha);
  }
);

export {
  dataSelector,
  enabledSeriesSelector,
  findSeries,
  sourceSelector,
  seriesNamesSelector,
  idSelector as seriesIdSelector,
  getColorSelector as getColor,
};

export default graphSelector;
