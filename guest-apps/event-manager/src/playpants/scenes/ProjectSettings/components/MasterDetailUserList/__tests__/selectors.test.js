import mockState from 'playpants/testUtils/mockState';
import * as selectors from '../selectors';

const { Users } = mockState.Scenes.ProjectSettings;

describe('ProjectSettings', () => {
  describe('selectors', () => {
    describe('userListSelector', () => {
      it('correctly selects Users', () => {
        const users = selectors.usersSelector(mockState);
        expect(users).toEqual(Users);
      });

      it('returns users as an array of objects', () => {
        const filteredUsers = selectors.userListSelector(mockState);
        expect(filteredUsers).toEqual(Users.availableUsers.data);
      });

      it('returns empty array when no "match" is found', () => {
        const newMockState = {
          Scenes: {
            ProjectSettings: {
              Users: {
                availableUsers: {
                  ...Users.availableUsers,
                },
                userListFilters: {
                  query: 'Non-Existant User',
                  group: 'All',
                },
              },
            },
          },
        };

        const filteredUsers = selectors.userListFilteredSelector(newMockState);
        expect(filteredUsers).toEqual([]);
      });
    });

    it('returns a link to the next page', () => {
      const nextPage = selectors.usersNextPageSelector(mockState);
      expect(nextPage).toEqual(Users.availableUsers.next);
    });
  });
});
