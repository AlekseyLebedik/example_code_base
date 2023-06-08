import React from 'react';
import { shallow } from 'enzyme';

import EventNotesField from '../index';

describe('EventNotesField', () => {
  const wrapper = shallow(<EventNotesField />);

  it('renders default properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
