import React from 'react';
import { shallow } from 'enzyme';
import { deleteStoryMessageProps } from 'playpants/testUtils/groupStoriesProps';
import { DeleteStoryMessageBase } from '../index';

describe('DeleteStoryMessage', () => {
  const root = shallow(<DeleteStoryMessageBase {...deleteStoryMessageProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
