import { buildSeries } from '../selectors';

describe('GraphContainer selectors', () => {
  describe('buildSeries', () => {
    const series = [
      { id: 1, name: 'My cool project', short: 'mcp' },
      { id: 2, name: 'total' },
    ];
    const visibility = { 1: false, 2: true };
    const colors = { 1: 'red', 2: 'green' };

    it('empty state', () => {
      expect(buildSeries({})).toBe(undefined);
    });

    it('no colors', () => {
      expect(buildSeries({ series, visibility })).toMatchSnapshot();
    });

    it('with colors', () => {
      expect(buildSeries({ series, visibility, colors })).toMatchSnapshot();
    });
  });
});
