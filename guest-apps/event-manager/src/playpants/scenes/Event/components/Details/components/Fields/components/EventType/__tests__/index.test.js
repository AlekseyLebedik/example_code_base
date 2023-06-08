import React from 'react';
import { mount } from 'enzyme';

import { EventTypeBase } from '../index';

describe('EventTypeField', () => {
  const wrapper = mount(<EventTypeBase eventTypeName="PMG" />);

  it('renders the Platforms component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
