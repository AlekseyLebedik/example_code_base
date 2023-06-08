import React from 'react';
import { shallow } from 'enzyme';
import { taskMonitorSidebarProps as props } from 'playpants/testUtils/eventProps';

import TaskMonitorSidebarStateless from '../presentational';

describe('TaskMonitorSidebarStateless', () => {
  const root = shallow(<TaskMonitorSidebarStateless {...props} />);
  it('renders default props', () => {
    expect(root).toMatchSnapshot();
  });
});
