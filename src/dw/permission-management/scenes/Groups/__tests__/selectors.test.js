import {
  selectedItemSelector,
  nextPageSelector,
  initialValuesSelector,
  isLoadingDetailsSelector,
} from '../selectors';

describe('Groups - selectors', () => {
  const groupsList = [{ id: 1 }, { id: 2 }, { id: 3 }];

  const objectPermissions = {
    1: {
      data: [
        {
          id: 9,
          contentTypeId: 19,
          objectPk: '2',
          permissionId: 123,
          companyGroupId: 3,
        },
      ],
      nextPageToken: null,
      loading: false,
    },
  };
  const state = {
    Scenes: {
      companies: { loading: false },
      Groups: {
        Groups: { data: groupsList, next: 'http://blah/api/v2/users/?page=2' },
        ContentTypes: {
          data: [{ id: 19, appLabel: 'src', model: 'project' }],
          loading: false,
        },
        ObjectPermissions: { data: objectPermissions },
        GroupUsers: { data: [{ id: 19 }], loading: false },
        AvailableGroupUsers: { data: [{ id: 19 }], loading: false },
      },
    },
    permissions: { loading: false },
  };

  it('returns the selectedItem', () => {
    const props = {
      match: {
        params: {
          id: 1,
        },
      },
    };
    expect(selectedItemSelector(state, props)).toEqual(groupsList[0]);
  });

  it('returns the nextPage', () => {
    expect(nextPageSelector(state)).toEqual('http://blah/api/v2/users/?page=2');
  });

  it('returns loading state', () => {
    const props = {
      match: {
        params: {
          id: 1,
        },
      },
    };
    expect(isLoadingDetailsSelector(state, props)).toEqual(false);
  });

  it('returns initial values for advanced tab', () => {
    const props = {
      match: {
        params: {
          id: 1,
        },
      },
    };
    expect(initialValuesSelector(state, props)).toEqual({
      contentTypes: [
        {
          selections: [
            {
              selectedDetails: [2],
              permissions: [123],
            },
          ],
          cTypeId: 19,
        },
      ],
      users: [{ id: 19 }],
    });
  });
});
