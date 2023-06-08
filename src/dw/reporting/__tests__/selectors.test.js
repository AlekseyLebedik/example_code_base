import {
  franchises as franchisesMock,
  franchiseData as franchiseDataMock,
} from 'dw/reporting/__mocks__/franchises';

import {
  franchisesSelector,
  franchiseIdSelector,
  selectedFranchiseSelector,
  selectedProjectSelector,
  franchiseDataSelector,
  getProjectName,
} from '../selectors';

jest.mock('dw/reporting/constants', () => ({
  PROJECT_NAME_TRANSFORMATION_EXCEPTIONS: ['Hello World'],
  PROJECT_NAME_MAP: { III: 'Third Edition' },
}));

describe('Reporting selectors', () => {
  const state = {
    reporting: {
      franchises: franchisesMock,
      franchiseData: franchiseDataMock,
    },
  };

  const matchProps = (params = {}) => ({
    match: {
      params,
    },
  });

  const franchiseId = 2;
  const expectedFranchise = franchisesMock.find(f => f.id === franchiseId);
  const projectId = 4;
  const expectedProject = expectedFranchise.projects.find(
    p => p.id === projectId
  );

  describe('franchisesSelector', () => {
    it('returns undefined by default', () => {
      expect(franchisesSelector()).toEqual(undefined);
    });
    it('returns franchises', () => {
      expect(franchisesSelector(state)).toEqual(franchisesMock);
    });
  });

  describe('franchiseDataSelector', () => {
    it('returns undefined by default', () => {
      expect(franchiseDataSelector()).toEqual(undefined);
    });
    it('returns franchiseData', () => {
      expect(franchiseDataSelector(state)).toEqual(franchiseDataMock);
    });
  });

  describe('franchiseIdSelector', () => {
    it('returns undefined if no franchiseId', () => {
      expect(franchiseIdSelector(null, matchProps())).toEqual(undefined);
    });
    it('returns franchiseId', () => {
      expect(franchiseIdSelector(null, matchProps({ franchiseId }))).toEqual(
        franchiseId
      );
    });
  });

  describe('selectedFranchiseSelector', () => {
    it('returns null if no franchises', () => {
      expect(
        selectedFranchiseSelector(null, matchProps({ franchiseId }))
      ).toEqual(null);
    });
    it('returns undefined if no franchiseId', () => {
      expect(selectedFranchiseSelector(state, matchProps())).toEqual(null);
    });
    it('returns franchise', () => {
      expect(
        selectedFranchiseSelector(state, matchProps({ franchiseId }))
      ).toEqual(expectedFranchise);
    });
  });

  describe('selectedProjectSelector', () => {
    it('returns null if no franchises', () => {
      expect(
        selectedProjectSelector(null, matchProps({ franchiseId, projectId }))
      ).toEqual(null);
    });
    it('returns undefined if no franchiseId', () => {
      expect(selectedProjectSelector(state, matchProps({ projectId }))).toEqual(
        null
      );
    });
    it('returns undefined if no projectId', () => {
      expect(
        selectedProjectSelector(state, matchProps({ franchiseId }))
      ).toEqual(undefined);
    });
    it('returns project', () => {
      expect(
        selectedProjectSelector(state, matchProps({ franchiseId, projectId }))
      ).toEqual(expectedProject);
    });
  });

  describe('getProjectName', () => {
    it('trims franchise name at the start', () => {
      const franchiseName = 'My Franchise';
      const projectName = 'My Franchise: Third Edition';
      expect(getProjectName(franchiseName, projectName)).toBe('Third Edition');
    });
    it('respects PROJECT_NAME_TRANSFORMATION_EXCEPTIONS', () => {
      const franchiseName = 'Hello World';
      const projectName = 'Hello World: Third Edition';
      expect(getProjectName(franchiseName, projectName)).toBe(projectName);
    });
    it('respects PROJECT_NAME_MAP', () => {
      const franchiseName = 'My Franchise';
      const projectName = 'My Franchise: III';
      expect(getProjectName(franchiseName, projectName)).toBe('Third Edition');
    });
  });
});
