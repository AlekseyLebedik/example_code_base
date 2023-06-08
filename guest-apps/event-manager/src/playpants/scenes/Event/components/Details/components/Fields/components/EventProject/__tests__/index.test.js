import React from 'react';
import { mount } from 'enzyme';

import EventProject from '../index';

describe('EventProjectField', () => {
  const wrapper = mount(<EventProject />);

  it('renders the project component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
