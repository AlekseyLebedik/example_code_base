import mockState from 'playpants/testUtils/mockState';
import * as selectors from '../selectors';

describe('ProjectSettings selectors', () => {
  describe('initial values selector', () => {
    it('returns initial values', () => {
      const initialValues = selectors.initialValuesSelector(mockState);
      expect(initialValues).toEqual({ groups: ['1'] });
    });
  });
});
