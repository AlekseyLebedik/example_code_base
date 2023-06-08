import { getTitleName } from '../helpers';

describe('getTitleName()', () => {
  const titles = [
    { id: 1, name: 'CTR-Blueberry' },
    { id: 2, name: 'iw8' },
  ];
  it('Returns title name from list with "-" substring', () => {
    expect(getTitleName(1, titles)).toEqual('Blueberry');
  });

  it('Returns whole title name from list with no "-" substring', () => {
    expect(getTitleName(2, titles)).toEqual('iw8');
  });
});
