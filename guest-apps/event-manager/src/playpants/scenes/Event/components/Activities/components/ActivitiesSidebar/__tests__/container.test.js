import React from 'react';
import { shallow } from 'enzyme';

import { activitiesSidebarProps as props } from 'playpants/testUtils/eventProps';

import { ActivitiesSidebar } from '../container';

describe('ActivitiesSidebar', () => {
  const root = shallow(<ActivitiesSidebar {...props} />);
  it('renders ActivitiesSidebar correctly', () => {
    expect(root).toMatchSnapshot();
  });

  it('check that we get different list items', () => {
    root.setProps({ activityTypeFilter: 'motd' });
    expect(root).toMatchSnapshot();
  });
});
