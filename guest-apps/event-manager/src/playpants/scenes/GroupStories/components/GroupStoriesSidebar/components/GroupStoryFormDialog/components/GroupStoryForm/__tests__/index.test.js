import React from 'react';
import { shallow } from 'enzyme';
import { groupStoryFormProps } from 'playpants/testUtils/groupStoriesProps';
import GroupStoryForm from '../index';

describe('GroupStoryForm', () => {
  const root = shallow(<GroupStoryForm {...groupStoryFormProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
