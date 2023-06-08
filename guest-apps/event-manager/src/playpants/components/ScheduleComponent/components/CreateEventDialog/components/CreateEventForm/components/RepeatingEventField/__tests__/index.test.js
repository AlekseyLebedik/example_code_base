import React from 'react';
import { shallow } from 'enzyme';

import { eventDateFieldRepeatingEventProps as repeatingEventProps } from 'playpants/testUtils/scheduleProps';

import RepeatingEventField from '../index';

describe('RepeatingEventField', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RepeatingEventField {...repeatingEventProps} />);
  });

  it('renders default properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders properly when repeatingEvent = true', () => {
    wrapper.setProps({ repeatingEvent: true });
    expect(wrapper).toMatchSnapshot();
  });
});
