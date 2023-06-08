import * as selectors from '../selectors';

describe('Permission Management', () => {
  describe('selectors', () => {
    describe('selectedItemIdSelector', () => {
      it('returns selectedItemId', () => {
        const props = {
          match: {
            params: {
              id: 1,
            },
          },
        };
        const selectedId = selectors.selectedItemIdSelector(null, props);
        expect(selectedId).toEqual(1);
      });
    });

    describe('createInitialValuesSelector', () => {
      const selectedItemId = { id: 1 };
      const contentTypes = [
        {
          id: 1,
          details: [],
        },
        {
          id: 2,
          details: [
            {
              id: 2,
              title: 'detail2',
            },
            {
              id: 3,
              title: 'detail3',
            },
          ],
          permissions: [
            {
              id: 1,
              name: 'perm1',
            },
            {
              id: 2,
              name: 'perm2',
            },
          ],
        },
        { id: 3 },
      ];

      const objectPermissions = {
        1: {
          data: [
            { id: 1, objectPk: 2, permissionId: 1, contentTypeId: 2 },
            { id: 2, objectPk: 2, permissionId: 4, contentTypeId: 2 },
            { id: 3, objectPk: 3, permissionId: 2, contentTypeId: 2 },
          ],
        },
      };
      let initialValueSelector = null;
      beforeEach(() => {
        initialValueSelector = selectors.createInitialValuesSelector(
          () => selectedItemId,
          () => objectPermissions,
          () => contentTypes
        );
      });
      it('returns a function', () => {
        expect(initialValueSelector).toBeInstanceOf(Function);
      });

      it('returned function will returned initial values when called', () => {
        expect(initialValueSelector()).toMatchObject({
          contentTypes: [
            { cTypeId: 1, selections: [] },
            {
              cTypeId: 2,
              selections: [
                {
                  permissions: [2],
                  selectedDetails: [3],
                },
                {
                  permissions: [1, 4],
                  selectedDetails: [2],
                },
              ],
            },
            { cTypeId: 3, selections: [] },
          ],
        });
      });
    });
  });
});
