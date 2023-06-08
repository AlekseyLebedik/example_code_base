import React from 'react';
import { mount } from 'enzyme';

import { eventFieldsProps as props } from 'playpants/testUtils/eventProps';

import Environment from '../index';

describe('Environment', () => {
  const wrapper = mount(<Environment {...props} />);

  it('renders the Environment component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
