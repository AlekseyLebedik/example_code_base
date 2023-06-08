import {
  selectedItemSelector,
  nextPageSelector,
  initialValuesSelector,
  loadingDetailsSelector,
} from '../selectors';

describe('Companies - Selectors', () => {
  const companiesList = [{ id: 1 }, { id: 2 }, { id: 3 }];

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

  const users = [{ id: 15, username: 'blah' }];

  const state = {
    Scenes: {
      companies: {
        data: companiesList,
        next: 'http://blah/api/v2/users/?page=2',
      },
      Companies: {
        ContentTypes: {
          data: [{ id: 19, appLabel: 'src', model: 'project' }],
          loading: false,
        },
        ObjectPermissions: {
          data: objectPermissions,
        },
        Users: {
          data: users,
        },
      },
    },
  };

  it('returns selectedItem', () => {
    const props = {
      match: {
        params: {
          id: 1,
        },
      },
    };
    expect(selectedItemSelector(state, props)).toEqual(companiesList[0]);
  });

  it('returns nextPage', () => {
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
    expect(loadingDetailsSelector(state, props)).toEqual(false);
  });

  it('returns initial values', () => {
    const props = {
      match: {
        params: {
          id: 1,
        },
      },
    };

    expect(initialValuesSelector(state, props)).toEqual({
      users,
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
    });
  });
});
