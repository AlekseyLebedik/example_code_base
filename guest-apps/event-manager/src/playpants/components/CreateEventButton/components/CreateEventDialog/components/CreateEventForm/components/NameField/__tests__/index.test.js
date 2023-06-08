import React from 'react';
import { shallow } from 'enzyme';

import EventNameField from '../index';

describe('EventNameField', () => {
  const wrapper = shallow(<EventNameField />);

  it('renders default properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
