import { createSelector } from 'reselect';

const buildSeries = createSelector(
  state => state.series,
  state => state.visibility,
  state => state.colors,
  (series, visibility, colors) =>
    series &&
    series.map(s => ({
      ...s,
      id: s.id,
      name: s.name,
      short: s.short || s.name,
      visible: visibility[s.id],
      color: colors && colors[s.id],
    }))
);

export { buildSeries };
