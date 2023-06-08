import mockState from 'playpants/testUtils/mockState';
import { formatBuild } from '../helpers';

describe('BuildSummary helpers', () => {
  describe('formatBuild()', () => {
    it('properly formats build', () => {
      expect(
        formatBuild(
          mockState.Scenes.Event.activity.thunderpants.buildList.data[0],
          mockState.Scenes.Event.activity.thunderpants.buildSchema.data
        )
      ).toMatchSnapshot();
    });
  });
});
