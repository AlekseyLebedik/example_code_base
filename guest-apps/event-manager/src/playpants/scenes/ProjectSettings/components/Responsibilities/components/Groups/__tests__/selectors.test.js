import mockState from 'playpants/testUtils/mockState';
import { availableUsers } from 'playpants/testUtils/projectSettingsProps';
import * as selectors from '../selectors';

const { group } = mockState.Scenes.ProjectSettings.Responsibilities;

describe('GroupResponsibilities', () => {
  describe('main selectors', () => {
    describe('membersSelector', () => {
      it('correctly selects members', () => {
        const data = selectors.membersSelector(mockState);
        expect(data).toEqual(group.members);
      });
    });

    describe('availableUsersSelector', () => {
      it('correctly selects available users data', () => {
        const data = selectors.availableUsersSelector(mockState);
        expect(data).toEqual(availableUsers);
      });
    });

    describe('memberListSelector', () => {
      it('correctly selects group members data', () => {
        const data = selectors.memberListSelector(mockState);
        expect(data).toEqual(group.members.data);
      });
    });
  });
});
