import React from 'react';
import { shallow } from 'enzyme';
import { statelessScheduleStoriesDetailProps } from 'playpants/testUtils/timewarp/components/scheduleStoriesProps';
import { StatelessScheduleStoriesDetailBase } from '../presentational';

describe('StatelessScheduleStoriesDetail', () => {
  const root = shallow(
    <StatelessScheduleStoriesDetailBase
      {...statelessScheduleStoriesDetailProps}
    />
  );
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
