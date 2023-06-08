import React from 'react';
import { shallow } from 'enzyme';

import { eventTypeFieldProps as props } from 'playpants/testUtils/scheduleProps';

import EventTypeField from '../index';

describe('EventTypeField', () => {
  const wrapper = shallow(<EventTypeField {...props} />);

  it('renders default properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
