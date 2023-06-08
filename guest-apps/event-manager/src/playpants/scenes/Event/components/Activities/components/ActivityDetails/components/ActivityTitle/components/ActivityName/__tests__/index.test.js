import React from 'react';
import { mount } from 'enzyme';

import { statelessActivityTitleProps as props } from 'playpants/testUtils/eventProps';

import ActivityName from '../index';

describe('ActivityName', () => {
  const wrapper = mount(<ActivityName {...props} />);
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
