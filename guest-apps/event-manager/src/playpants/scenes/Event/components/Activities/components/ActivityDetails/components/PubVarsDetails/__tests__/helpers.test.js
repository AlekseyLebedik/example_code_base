import { pubvarsProps as props } from 'playpants/testUtils/eventProps';

import { chooseFilterValues } from '../helpers';

describe('PublisherVariables helpers', () => {
  describe('chooseFilterValues', () => {
    it("returns the list of filter values for the activity's variable sets", () => {
      expect(
        chooseFilterValues(props.pubVarsActivity.activity.variable_sets)
      ).toEqual({
        context: ['1'],
        group_id: ['1', '2'],
        namespace: ['Namespace1', 'Namespace3'],
      });
    });
  });
});
