import { comparatorFilter, numberComparator, dateComparator } from '../aggrid';

describe('helpers/aggrid', () => {
  it('makes filter comparator compatible with Ag-Grid', () => {
    expect(comparatorFilter('contains', 'abcdef', 'cde')).toBe(true);
    expect(comparatorFilter('contains', 'abcdef', 'g')).toBe(false);
    expect(comparatorFilter('notContains', 'abcdef', 'g')).toBe(true);
    expect(comparatorFilter('notContains', 'abcdef', 'cde')).toBe(false);
    expect(comparatorFilter('equals', 'abcdef', 'abcdef')).toBe(true);
    expect(comparatorFilter('equals', 'abcdef', 'a')).toBe(false);
    expect(comparatorFilter('notEqual', 'abcdef', 'a')).toBe(true);
    expect(comparatorFilter('notEqual', 'abcdef', 'abcdef')).toBe(false);
    expect(comparatorFilter('startsWith', 'abcdef', 'a')).toBe(true);
    expect(comparatorFilter('startsWith', 'abcdef', 'f')).toBe(false);
    expect(comparatorFilter('endsWith', 'abcdef', 'f')).toBe(true);
    expect(comparatorFilter('endsWith', 'abcdef', 'a')).toBe(false);
  });
  it('makes number comparator compatible with Ag-Grid', () => {
    const n1 = 3000.1;
    const n2 = 2991.55;

    expect(numberComparator(n1, n2)).toBe(parseFloat(n1) - parseFloat(n2));
  });
  it('makes date comparator compatible with Ag-Grid', () => {
    const d1 = new Date();
    const d2 = new Date(d1.getTime() - 10000);

    // the comparator converts to 'real' (seconds) UTC timestamps
    expect(dateComparator(d1, d2)).toBe(10);
  });
});
