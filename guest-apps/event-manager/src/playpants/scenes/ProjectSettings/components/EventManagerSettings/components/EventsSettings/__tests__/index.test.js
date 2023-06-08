import React from 'react';
import { mount } from 'enzyme';
import { eventSettingsProps as props } from 'playpants/testUtils/projectSettingsProps';

import { EventSettings } from '../index';

describe('EventSettings', () => {
  const wrapper = mount(<EventSettings {...props} />);

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
