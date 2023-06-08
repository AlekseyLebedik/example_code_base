import mockState from 'playpants/testUtils/mockState';
import * as selectors from '../selectors';

const { GamertagManagement } = mockState.Components;

describe('GamertagManagement', () => {
  describe('main selectors', () => {
    describe('groupsSelector', () => {
      it('correctly selects groups', () => {
        const data = selectors.groupsSelector(mockState);
        expect(data).toEqual(GamertagManagement.groups);
      });
    });

    describe('accountsSelector', () => {
      it('correctly selects accounts', () => {
        const data = selectors.accountsSelector(mockState);
        expect(data).toEqual(GamertagManagement.accounts);
      });
    });

    describe('groupListSelector', () => {
      it('correctly selects groups data', () => {
        const data = selectors.groupListSelector(mockState);
        expect(data).toEqual(GamertagManagement.groups.data);
      });
    });

    describe('nextGroupsSelector', () => {
      it('correctly selects next groups', () => {
        const data = selectors.nextGroupsSelector(mockState);
        expect(data).toEqual(GamertagManagement.groups.next);
      });
    });

    describe('accountListSelector', () => {
      it('correctly selects group accounts data', () => {
        const data = selectors.accountListSelector(mockState);
        expect(data).toEqual(GamertagManagement.accounts.data);
      });
    });
  });
});
