import * as selectors from '../selectors';
import { FORM_NAME as TEST_FORM_NAME } from '../constants';

describe('ABTestForm selectors', () => {
  it('returns list of categories', () => {
    const categories = ['Category1', 'Category2', 'Other'];
    expect(
      selectors.categoriesListSelector({
        form: { [TEST_FORM_NAME]: { values: { context: '1:dev' } } },
        Scenes: { ABTestForm: { contexts: { '1:dev': { categories } } } },
      })
    ).toEqual(categories);
  });

  it('returns selected context value of the ABTesting form', () => {
    const expected = '1:dev';
    expect(
      selectors.selectedContextFormSelector({
        form: { [TEST_FORM_NAME]: { values: { context: '1:dev' } } },
      })
    ).toEqual(expected);
  });

  it('returns selected Enrollment Period From value of the ABTesting form', () => {
    const expected = 1542283980;
    expect(
      selectors.selectedCatchStartSelector({
        form: { [TEST_FORM_NAME]: { values: { catchStart: 1542283980 } } },
      })
    ).toEqual(expected);
  });

  it('returns selected Enrollment Period To value of the ABTesting form', () => {
    const expected = 1542283980;
    expect(
      selectors.selectedCatchEndSelector({
        form: { [TEST_FORM_NAME]: { values: { catchEnd: 1542283980 } } },
      })
    ).toEqual(expected);
  });

  it('returns configs for the given context', () => {
    const expected = [{ configID: '3511476886449203876', name: 'testcfg1' }];
    expect(
      selectors.configsListFormSelector({
        Scenes: {
          ABTestForm: {
            configs: {
              '1:dev': [{ configID: '3511476886449203876', name: 'testcfg1' }],
              '1:cert': [{ configID: '4511476886449203876', name: 'testcfg2' }],
            },
          },
        },
        form: { [TEST_FORM_NAME]: { values: { context: '1:dev' } } },
      })
    ).toEqual(expected);
  });

  it('returns segments for the given context', () => {
    const expected = [
      { segmentID: '9595523334656040987', name: 'testseg5682-2' },
    ];
    expect(
      selectors.segmentsListFormSelector({
        Scenes: {
          ABTestForm: {
            segments: {
              '1:dev': [
                { segmentID: '5210984693501455903', name: 'testseg5682' },
              ],
              '1:cert': [
                { segmentID: '9595523334656040987', name: 'testseg5682-2' },
              ],
            },
          },
        },
        form: { [TEST_FORM_NAME]: { values: { context: '1:cert' } } },
      })
    ).toEqual(expected);
  });

  it('returns default form initial values', () => {
    const expected = { cohorts: [{ treatments: [{}] }] };
    const initialValuesSelector = selectors.makeInitialValuesSelector();
    expect(
      initialValuesSelector(
        {
          Scenes: {
            ABTestForm: {
              configs: {
                '1:dev': [
                  { configID: '3511476886449203876', name: 'testcfg1' },
                ],
              },
            },
            Update: { test: {} },
          },
        },
        { titleID: '1', environment: 'dev' }
      )
    ).toEqual(expected);
  });

  it('returns form initial values for the given test', () => {
    const expected = {
      assignmentAlgorithm: 'sha256',
      assignmentSeed: '5323370e972b42debcb87af3c5d07a46',
      catchEnd: '1541578440',
      catchStart: '1540922460',
      categories: ['revenue'],
      cohorts: [
        {
          cohortID: '16067082912942122876',
          isControl: false,
          maxMembers: undefined,
          name: 'Cohort 1',
          percent: '12',
          segmentID: undefined,
          source: 'manual',
          treatments: [
            {
              configs: [
                { configID: '3511476886449203876', configName: 'testcfg1' },
              ],
              end: '1541578320',
              serviceId: undefined,
              start: '1540922460',
            },
          ],
        },
      ],
      comments: 'Commentary on the changes',
      context: '1:dev',
      creator: 'creator@demonware.net',
      data_scientist: 'ds@example.com',
      organisation: 'Demonware',
      purpose: undefined,
      name: 'Revenue Test 7 cloned',
    };
    const initialValuesSelector = selectors.makeInitialValuesSelector();
    expect(
      initialValuesSelector(
        {
          Scenes: {
            ABTestForm: {
              configs: {
                '1:dev': [
                  { configID: '3511476886449203876', name: 'testcfg1' },
                ],
              },
            },
            Update: {
              test: {
                status: 'configuration',
                updated: '1541492096',
                catchEnd: '1541578440',
                catchStart: '1540922460',
                assignmentSeed: '5323370e972b42debcb87af3c5d07a46',
                assignmentAlgorithm: 'sha256',
                creator: 'creator@demonware.net',
                created: '1541492096',
                testID: '5766337652803599820',
                data_scientist: 'ds@example.com',
                organisation: 'Demonware',
                categories: ['revenue'],
                name: 'Revenue Test 7 cloned',
                context: 'game2',
                comments: 'Commentary on the changes',
                cohorts: [
                  {
                    cohortID: '16067082912942122876',
                    name: 'Cohort 1',
                    isControl: false,
                    source: {
                      percent: '12',
                      type: 'manual',
                    },
                    treatments: [
                      {
                        start: '1540922460',
                        end: '1541578320',
                        configs: ['3511476886449203876'],
                      },
                    ],
                  },
                ],
              },
            },
          },
        },
        { titleID: '1', environment: 'dev' }
      )
    ).toEqual(expected);
  });
});
