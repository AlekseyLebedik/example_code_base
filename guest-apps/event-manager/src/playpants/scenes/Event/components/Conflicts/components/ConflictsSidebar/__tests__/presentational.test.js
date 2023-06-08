import React from 'react';
import { shallow } from 'enzyme';

import { conflictsSidebarProps as props } from 'playpants/testUtils/eventProps';

import ConflictsSidebarStateless from '../presentational';

describe('ConflictsSidebarStateless', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConflictsSidebarStateless {...props} />);
  });

  it('renders default correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
