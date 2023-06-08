import React from 'react';
import { shallow } from 'enzyme';

import { activityTypeProps as props } from 'playpants/testUtils/eventProps';

import ActivityType from '../index';

describe('ActivityType', () => {
  const root = shallow(<ActivityType {...props} />);
  it('renders the ActivityType container correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
