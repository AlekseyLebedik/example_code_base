import React from 'react';
import { shallow } from 'enzyme';
import { groupStoriesSidebarProps } from 'playpants/testUtils/groupStoriesProps';
import { GroupStoriesSidebarBase } from '../index';

describe('GroupStoriesSidebar', () => {
  const root = shallow(
    <GroupStoriesSidebarBase {...groupStoriesSidebarProps} />
  );
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
