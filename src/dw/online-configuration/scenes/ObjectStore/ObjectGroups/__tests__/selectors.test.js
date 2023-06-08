import {
  groupsListSelector,
  groupMembersSelector,
  groupDetailsLoadingSelector,
  selectedItemIdSelector,
  selectedItemSelector,
  baseUrlSelector,
} from '../selectors';

describe('Server Inventory selectors', () => {
  const mockGroups = [
    {
      groupID: 1,
      groupName: 'name',
      members: [{ userID: 1, userName: 'user1' }],
    },
  ];
  const state = {
    Scenes: {
      ObjectStore: {
        ObjectGroups: {
          groups: {
            data: mockGroups,
            isLoading: false,
          },
          groupDetails: { ...mockGroups[0], loading: true },
        },
      },
    },
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
