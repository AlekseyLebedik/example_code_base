import React from 'react';
import { shallow } from 'enzyme';
import { statelessScheduleStoriesProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import StatelessScheduleStories from '../presentational';

describe('StatelessScheduleStories', () => {
  const root = shallow(
    <StatelessScheduleStories {...statelessScheduleStoriesProps} />
  );
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
