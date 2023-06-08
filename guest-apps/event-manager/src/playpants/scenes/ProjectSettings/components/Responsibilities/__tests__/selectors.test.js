import mockState from 'playpants/testUtils/mockState';
import * as selectors from '../selectors';

const { Responsibilities } = mockState.Scenes.ProjectSettings;

describe('GroupResponsibilities', () => {
  describe('main selectors', () => {
    describe('groupsSelector', () => {
      it('correctly selects groups', () => {
        const data = selectors.groupsSelector(mockState);
        expect(data).toEqual(Responsibilities.groups);
      });
    });

    describe('optionsSelector', () => {
      it('correctly selects responsibility options', () => {
        const data = selectors.optionsSelector(mockState);
        expect(data).toEqual(Responsibilities.responsibilityOptions);
      });
    });

    describe('responsibilityGroupsSelector', () => {
      it('correctly selects responsibility groups', () => {
        const data = selectors.responsibilityGroupsSelector(mockState);
        expect(data).toEqual(Responsibilities.responsibilityGroups);
      });
    });

    describe('responsibilityGroupsListSelector', () => {
      it('correctly selects responsibility groups data', () => {
        const data = selectors.responsibilityGroupsListSelector(mockState);
        expect(data).toEqual(Responsibilities.responsibilityGroups.data);
      });
    });

    describe('responsibilityGroupsParamSelector', () => {
      it('correctly selects responsibility groups params', () => {
        const data = selectors.responsibilityGroupsParamSelector(mockState);
        expect(data).toEqual(Responsibilities.responsibilityGroups.params);
      });
    });

    describe('responsibilityOptionsSelector', () => {
      it('correctly selects responsibility options data', () => {
        const data = selectors.responsibilityOptionsSelector(mockState);
        expect(data).toEqual(Responsibilities.responsibilityOptions.data);
      });
    });

    describe('groupListSelector', () => {
      it('correctly selects groups data', () => {
        const data = selectors.groupListSelector(mockState);
        expect(data).toEqual(Responsibilities.groups.data);
      });
    });

    describe('nextGroupsSelector', () => {
      it('correctly selects next groups', () => {
        const data = selectors.nextGroupsSelector(mockState);
        expect(data).toEqual(Responsibilities.groups.next);
      });
    });
  });
});
