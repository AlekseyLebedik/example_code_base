import {
  groupsListSelector,
  groupMembersSelector,
  groupDetailsLoadingSelector,
  selectedItemIdSelector,
  makeSelectedItemSelector,
  baseUrlSelector,
} from '../selectors';

describe('ABTestGroups selectors', () => {
  const mockGroups = [
    {
      groupID: 1,
      groupName: 'name',
      members: [{ userID: 1, userName: 'user1' }],
    },
  ];
  const mockConfigs = [
    {
      serviceID: 't8',
      configID: '2062759754244844487',
      name: 'config1',
      modifiers: '{"key1":"value1"}',
    },
    {
      serviceID: 'ae',
      configID: '2344554244844487',
      name: 'config2',
      modifiers: '{"key2":"value2"}',
    },
  ];
  const mockTests = [
    {
      testID: '1234567890',
      status: 'configuration',
      catchEnd: '1572515891',
      catchStart: '1571734691',
      name: 'My Deals ABR Bundle',
      cohorts: [
        {
          name: 'ABR-Direct-Weapon',
          groups: [{ groupID: 1 }],
          treatments: [
            {
              start: '1571734691',
              end: '1572515891',
              configs: ['2062759754244844487', '2344554244844487'],
            },
          ],
        },
      ],
    },
    {
      testID: '0987654321',
      status: 'configuration',
      catchEnd: '1572515891',
      catchStart: '1571734691',
      name: 'My Deals ABR Bundle',
      cohorts: [
        {
          name: 'ABR-Direct-Weapon',
          groups: [{ groupID: 2 }],
          treatments: [
            {
              start: '1571734691',
              end: '1572515891',
              configs: ['2062759754244844487', '2344554244844487'],
            },
          ],
        },
      ],
    },
  ];
  const state = {
    Scenes: {
      ABTestGroups: {
        groups: {
          data: mockGroups,
          isLoading: false,
          params: { context: '1:dev' },
        },
        groupDetails: { ...mockGroups[0], loading: true },
        configs: { data: mockConfigs, loading: false },
        tests: { data: mockTests, loading: false },
      },
    },
    user: {
      projects: [
        {
          id: 1,
          name: 'GTR Project',
          contentTypeId: 17,
          titles: [
            {
              platform: 'PS3',
              id: 1,
              name: 'GTR-PS3',
              environments: [
                { usesAE: true, usesABTesting: true, shortType: 'dev' },
                { usesAE: true, usesABTesting: true, shortType: 'cert' },
              ],
            },
          ],
        },
      ],
      profile: {
        id: 1,
        name: 'Initial User',
        isStaff: true,
        timezone: 'America/Vancouver',
      },
    },
    permissions: { memberships: [] },
    Components: {},
  };

  const matchProps = (params = {}, props = {}) => ({
    match: {
      params,
      ...props,
    },
  });

  describe('groupsListSelector', () => {
    it('returns groups', () => {
      expect(groupsListSelector(state)).toEqual(mockGroups);
    });
  });

  describe('groupMembersSelector', () => {
    it('returns the members of a group', () => {
      expect(groupMembersSelector(state)).toEqual([
        { id: 1, username: 'user1' },
      ]);
    });
  });

  describe('groupDetailsLoadingSelector', () => {
    it('returns the members of a group', () => {
      expect(groupDetailsLoadingSelector(state)).toEqual(true);
    });
  });

  describe('selectedItemIdSelector', () => {
    it('returns selected item id', () => {
      const id = 1;
      expect(selectedItemIdSelector(state, matchProps({ id }))).toEqual(id);
    });
  });

  describe('selectedItemSelector', () => {
    it('returns selected item', () => {
      const selectedItemSelector = makeSelectedItemSelector();
      const id = 1;
      expect(selectedItemSelector(state, matchProps({ id }))).toEqual({
        groupID: 1,
        groupName: 'name',
        members: [{ userID: 1, userName: 'user1' }],
      });
    });
  });

  describe('baseUrlSelector', () => {
    it('returns base url', () => {
      const baseUrl = 'http://test.com';
      const id = 1;
      const path = `${baseUrl}:id=${id}`;
      expect(baseUrlSelector(state, matchProps({ id }, { path }))).toEqual(
        baseUrl
      );
    });
  });
});
