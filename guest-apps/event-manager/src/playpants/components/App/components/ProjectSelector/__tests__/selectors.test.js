import mockState from 'playpants/testUtils/mockState';

import * as selectors from '../selectors';

describe('App', () => {
  describe('selectors', () => {
    describe('currentProjectSelector', () => {
      it('returns current project as an array of objects', () => {
        const project = selectors.currentProjectSelector(mockState);
        const testProject = {
          id: 1,
          name: 'GTR Project',
          contentTypeId: 19,
          titles: [
            {
              id: 1,
              platform: 'PS3',
              name: 'GTR-PS3',
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
            },
          ],
        };
        expect(project).toEqual(testProject);
      });
    });

    describe('currentProjectIdSelector', () => {
      it('returns current project id', () => {
        const value = selectors.currentProjectIdSelector(mockState);
        const testValue = 1;
        expect(value).toEqual(testValue);
      });
    });

    describe('allProjectTitles', () => {
      it('returns all project titles', () => {
        const value = selectors.allProjectTitlesSelector(mockState);
        const testValue = [
          {
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
            name: 'GTR-PS3',
            platform: 'PS3',
          },
        ];
        expect(value).toEqual(testValue);
      });
    });
  });
});
