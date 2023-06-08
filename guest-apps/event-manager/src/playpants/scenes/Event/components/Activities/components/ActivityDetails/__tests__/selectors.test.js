import mockState from 'playpants/testUtils/mockState';
import { activitiesDetailsProps as props } from 'playpants/testUtils/eventProps';
import * as selectors from '../selectors';

const { selectedActivity } = props;

describe('ActivityDetails selectors', () => {
  describe('selectedActivitySelector', () => {
    it('selects an activity', () => {
      const testSelectedActivity = selectors.selectedActivitySelector(
        mockState,
        props
      );
      expect(testSelectedActivity).toEqual(selectedActivity);
    });
  });
});
