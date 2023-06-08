import {
  usersListSelector,
  selectedItemSelector,
  nextPageSelector,
  availableGroupsListSelector,
  isLoadingDetailsSelector,
  initialValuesAdvancedUsersSelector,
  companyAndMembershipSelector,
  companyMembershipsSelector,
} from '../selectors';

describe('Users - selectors', () => {
  const usersList = [{ id: 1 }, { id: 2 }, { id: 3 }];
  const availabGroupsList = [
    { id: 1, name: 'group1' },
    { id: 2, name: 'group2' },
  ];
  const assignedGroupsList = [{ id: 2, name: 'group2' }];
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
  const companies = [
    { id: 1, name: 'test' },
    { id: 2, name: 'foo' },
  ];
  const companyMembership = [
    {
      companyId: 2,
      id: 3,
      companyName: 'foo',
    },
  ];
  const state = {
    Scenes: {
      companies: { data: companies, loading: false },
      Users: {
        Users: { data: usersList, next: 'http://blah/api/v2/users/?page=2' },
        Groups: { data: availabGroupsList },
        AssignedGroups: { data: assignedGroupsList },
        ContentTypes: {
          data: [{ id: 19, appLabel: 'src', model: 'project' }],
          loading: false,
        },
        ObjectPermissions: { data: objectPermissions },
        CompanyMemberships: { data: companyMembership },
      },
    },
    permissions: {},
    user: { profile: {} },
  };

  it('returns the users list', () => {
    expect(usersListSelector(state)).toEqual(usersList);
  });

  it('returns the company membership list', () => {
    expect(companyMembershipsSelector(state, true)).toEqual(companyMembership);
  });

  it('returns the companies list', () => {
    expect(companyAndMembershipSelector(state)).toEqual(companies);
  });

  it('returns the selectedItem', () => {
    const props = {
      match: {
        params: {
          id: 1,
        },
      },
    };
    expect(selectedItemSelector(state, props)).toEqual(usersList[0]);
  });

  it('returns the nextPage', () => {
    expect(nextPageSelector(state)).toEqual('http://blah/api/v2/users/?page=2');
  });

  it('returns the available groups list', () => {
    expect(availableGroupsListSelector(state)).toMatchObject(availabGroupsList);
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
    expect(initialValuesAdvancedUsersSelector(state, props)).toEqual({
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
