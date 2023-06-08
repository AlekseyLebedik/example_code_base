import * as selectors from '../selectors';

describe('Archive selectors', () => {
  it('returns list of archived tests', () => {
    const tests = [
      {
        id: 1,
        test_name: 'Test 1',
        title: 'Title test 1',
        platform: 'PS4',
        environment: 'Dev',
        source: 'Treyach',
        target: 'Marketplace',
        testStatus: 'Archive',
        category: 'Other',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'killed',
      },
      {
        id: 2,
        test_name: 'Test 2',
        title: 'Title test 2',
        platform: 'PS4',
        environment: 'Dev',
        testStatus: 'Archive',
        source: 'Treyach',
        target: 'Marketplace',
        category: 'Other',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'config',
      },
      {
        id: 3,
        test_name: 'Test 3',
        title: 'Title test 3',
        platform: 'PS4',
        environment: 'Cert',
        testStatus: 'Archive',
        source: 'Treyach',
        target: 'Marketplace',
        category: 'Category1',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'archived',
      },
    ];
    const expected = [
      {
        id: 3,
        test_name: 'Test 3',
        title: 'Title test 3',
        platform: 'PS4',
        environment: 'Cert',
        source: 'Treyach',
        target: 'Marketplace',
        testStatus: 'Archive',
        category: 'Category1',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'archived',
      },
    ];
    expect(selectors.archivedTestsSelector(tests)).toEqual(expected);
  });
});
