import { abTestFetchResultsProps } from 'playpants/testUtils/scheduleProps';
import { parseABTests } from 'playpants/helpers/parseEventData';

describe('parseABTests()', () => {
  it('successfully parses AB test data', () => {
    expect(parseABTests(abTestFetchResultsProps)).toMatchSnapshot();
  });
});
