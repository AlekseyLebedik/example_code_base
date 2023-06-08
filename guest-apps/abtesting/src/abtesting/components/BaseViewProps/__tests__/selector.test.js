import { makeGetTestsSelector } from '../selectors';

describe('Selector', () => {
  describe('makeGetTestsSelector', () => {
    it('makeGetTestsSelector returns entire collection if there is no search', () => {
      const tests = [
        {
          id: 1,
          test_name: 'Test 1',
          titleID: 1,
          title: 'Title test 1',
          platform: 'PS4',
          environment: 'Dev',
          source: 'Treyach',
          target: '',
          category: 'Other',
          configsID: ['1234567890'],
          test_period_from: 1535454075,
          test_period_to: 1535455075,
          status: 'config',
        },
        {
          id: 2,
          test_name: 'Test 2',
          titleID: 1,
          title: 'Title test 2',
          platform: 'PS4',
          environment: 'Dev',
          source: 'Treyach',
          target: '',
          configsID: ['1234567890'],
          category: 'Other',
          test_period_from: 1535454075,
          test_period_to: 1535455075,
          status: 'config',
        },
      ];
      const q = undefined;

      const mockState = {
        Components: {
          BaseViewProps: {
            tests,
            q,
            configs: {},
          },
        },
      };

      const selector = makeGetTestsSelector();
      expect(selector(mockState)).toEqual(tests);
    });

    it('makeGetTestsSelector returns filtered collection when search matches with some result', () => {
      const tests = [
        {
          id: 1,
          test_name: 'Test 1',
          titleID: 1,
          title: 'Title test 1',
          platform: 'PS4',
          environment: 'Dev',
          source: 'Treyach',
          target: '',
          configsID: ['1234567890'],
          category: 'Other',
          test_period_from: 1535454075,
          test_period_to: 1535455075,
          status: 'config',
        },
        {
          id: 2,
          test_name: 'Test 2',
          titleID: 1,
          title: 'Title test 2',
          platform: 'PS4',
          environment: 'Dev',
          source: 'Treyach',
          target: '',
          configsID: ['1234567890'],
          category: 'Other',
          test_period_from: 1535454075,
          test_period_to: 1535455075,
          status: 'config',
        },
      ];
      const q = 'Test 1';

      const mockState = {
        Components: {
          BaseViewProps: {
            tests,
            q,
            configs: {},
          },
        },
      };

      const expected = [
        {
          id: 1,
          test_name: 'Test 1',
          titleID: 1,
          title: 'Title test 1',
          platform: 'PS4',
          environment: 'Dev',
          source: 'Treyach',
          target: '',
          configsID: ['1234567890'],
          category: 'Other',
          test_period_from: 1535454075,
          test_period_to: 1535455075,
          status: 'config',
        },
      ];

      const selector = makeGetTestsSelector();
      expect(selector(mockState)).toEqual(expected);
    });
  });
});
