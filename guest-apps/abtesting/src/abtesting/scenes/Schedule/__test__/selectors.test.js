import * as selectors from '../selectors';

describe('Schedule selectors', () => {
  const tests = [
    {
      id: 1,
      test_name: 'Test 1',
      title: 'Title test 1',
      platform: 'PS4',
      environment: 'Dev',
      source: 'Treyach',
      target: 'Marketplace',
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
      source: 'Treyach',
      target: 'Marketplace',
      category: 'Category1',
      test_period_from: 1535454075,
      test_period_to: 1535455075,
      status: 'approved',
    },
    {
      id: 5,
      test_name: 'Test 5',
      title: 'Title test 5',
      platform: 'PS4',
      environment: 'Cert',
      source: 'Treyach',
      target: 'Marketplace',
      category: 'Category5',
      test_period_from: 1535454075,
      test_period_to: 1535455075,
      status: 'active',
    },
    {
      id: 6,
      test_name: 'Test 6',
      title: 'Title test 6',
      platform: 'PS4',
      environment: 'Cert',
      source: 'Treyach',
      target: 'Marketplace',
      category: 'Category3',
      test_period_from: 1535454075,
      test_period_to: 1535455075,
      status: 'analysis',
    },
  ];
  it('returns list of upcoming tests', () => {
    const expected = [
      {
        id: 2,
        test_name: 'Test 2',
        title: 'Title test 2',
        platform: 'PS4',
        environment: 'Dev',
        testStatus: 'Upcoming',
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
        source: 'Treyach',
        testStatus: 'Upcoming',
        target: 'Marketplace',
        category: 'Category1',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'approved',
      },
    ];
    expect(selectors.upcomingTestsSelector(tests)).toEqual(expected);
  });

  it('returns list of live tests', () => {
    const expected = [
      {
        id: 5,
        test_name: 'Test 5',
        title: 'Title test 5',
        platform: 'PS4',
        environment: 'Cert',
        source: 'Treyach',
        testStatus: 'Live',
        target: 'Marketplace',
        category: 'Category5',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'active',
      },
    ];
    expect(selectors.liveTestsSelector(tests)).toEqual(expected);
  });

  it('returns list of finished tests', () => {
    const expected = [
      {
        id: 6,
        test_name: 'Test 6',
        title: 'Title test 6',
        platform: 'PS4',
        environment: 'Cert',
        source: 'Treyach',
        testStatus: 'Recently Finished',
        target: 'Marketplace',
        category: 'Category3',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'analysis',
      },
    ];
    expect(selectors.finishedTestsSelector(tests)).toEqual(expected);
  });
});
