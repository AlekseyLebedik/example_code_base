import React from 'react';
import { shallow } from 'enzyme';

import { eventManagerLinkProps as props } from 'playpants/testUtils/scheduleProps';

import { EventManagerLink } from '../index';

describe('EventManagerLink', () => {
  const wrapper = shallow(<EventManagerLink {...props} />);

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
