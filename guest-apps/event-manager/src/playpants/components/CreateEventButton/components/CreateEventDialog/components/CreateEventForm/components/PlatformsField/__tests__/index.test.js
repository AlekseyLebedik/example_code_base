import React from 'react';
import { shallow } from 'enzyme';

import { eventPlatformsFieldProps as props } from 'playpants/testUtils/scheduleProps';

import EventPlatformsField from '../index';

describe('EventPlatformsField', () => {
  const wrapper = shallow(<EventPlatformsField {...props} />);

  it('renders default properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
