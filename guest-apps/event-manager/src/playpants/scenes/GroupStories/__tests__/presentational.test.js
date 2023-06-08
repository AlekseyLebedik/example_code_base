import React from 'react';
import { shallow } from 'enzyme';
import { statelessGroupStoriesProps } from 'playpants/testUtils/groupStoriesProps';
import StatelessGroupStories from '../presentational';

describe('StatelessGroupStories', () => {
  const root = shallow(
    <StatelessGroupStories {...statelessGroupStoriesProps} />
  );
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
