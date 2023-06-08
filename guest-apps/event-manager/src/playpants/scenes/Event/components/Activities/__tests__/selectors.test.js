import mockState from 'playpants/testUtils/mockState';
import * as selectors from '../selectors';

describe('Activity selectors', () => {
  describe('projectTitlesSelector', () => {
    it('selects the titles for a project', () => {
      const testTitles = [
        {
          env: {
            contentTypeId: 8,
            id: 1,
            shortType: 'dev',
            type: 'Development',
            usesABTesting: true,
            usesAE: true,
            usesAsyncMMP: false,
            usesLegacyStore: false,
            usesMarketplace: true,
            usesObjectStore: true,
          },
          environments: [
            {
              contentTypeId: 8,
              id: 2,
              shortType: 'cert',
              type: 'Certification',
              usesABTesting: true,
              usesAE: true,
              usesAsyncMMP: false,
              usesLegacyStore: false,
              usesMarketplace: true,
              usesObjectStore: true,
            },
            {
              contentTypeId: 8,
              id: 1,
              shortType: 'dev',
              type: 'Development',
              usesABTesting: true,
              usesAE: true,
              usesAsyncMMP: false,
              usesLegacyStore: false,
              usesMarketplace: true,
              usesObjectStore: true,
            },
          ],
          id: 1,
          name: 'PS3',
          platform: 'PS3',
        },
      ];

      const selectedTitles = selectors.projectTitlesSelector(mockState);
      expect(selectedTitles).toEqual(testTitles);
    });
  });
});
