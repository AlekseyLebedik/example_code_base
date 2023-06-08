import React from 'react';
import { shallow } from 'enzyme';
import { listItemProps } from 'playpants/testUtils/groupStoriesProps';
import { ListItem } from '../index';

describe('ListItem', () => {
  const root = shallow(<ListItem {...listItemProps} />);
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
