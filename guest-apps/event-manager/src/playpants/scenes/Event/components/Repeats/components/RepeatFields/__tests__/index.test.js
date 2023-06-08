import React from 'react';
import { shallow } from 'enzyme';

import { repeatEventFieldsProps as props } from 'playpants/testUtils/eventProps';

import RepeatFields from '../index';

describe('RepeatFieldsBase', () => {
  const wrapper = shallow(<RepeatFields {...props} />);

  it('renders the RepeatFields component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
