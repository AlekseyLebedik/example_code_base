import React from 'react';
import { shallow } from 'enzyme';

import { conflictsSidebarProps as props } from 'playpants/testUtils/eventProps';

import { ConflictsSidebarBase } from '../container';

describe('ConflictsSidebarBase', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConflictsSidebarBase {...props} />);
  });

  it('renders default correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
