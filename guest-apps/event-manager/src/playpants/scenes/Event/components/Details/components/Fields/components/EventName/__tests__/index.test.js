import React from 'react';
import { mount } from 'enzyme';

import { eventFieldsProps as props } from 'playpants/testUtils/eventProps';

import EventName from '../index';

describe('EventName', () => {
  const wrapper = mount(<EventName {...props} />);

  it('renders the EventName component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
