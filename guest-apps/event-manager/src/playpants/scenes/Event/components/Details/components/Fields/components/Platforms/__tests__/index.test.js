import React from 'react';
import { mount } from 'enzyme';

import { eventPlatformFieldProps as props } from 'playpants/testUtils/eventProps';

import { PlatformsBase } from '../index';

describe('Platforms', () => {
  const wrapper = mount(<PlatformsBase {...props} />);

  it('renders the Platforms component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
