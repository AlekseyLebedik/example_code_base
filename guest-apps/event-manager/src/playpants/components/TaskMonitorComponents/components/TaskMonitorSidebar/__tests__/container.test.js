import React from 'react';
import { shallow } from 'enzyme';
import { taskMonitorSidebarProps as props } from 'playpants/testUtils/eventProps';

import { TaskMonitorSidebarBase } from '../container';

describe('TaskMonitorSidebarBase', () => {
  const root = shallow(<TaskMonitorSidebarBase {...props} />);
  it('renders default props', () => {
    expect(root).toMatchSnapshot();
  });
});
