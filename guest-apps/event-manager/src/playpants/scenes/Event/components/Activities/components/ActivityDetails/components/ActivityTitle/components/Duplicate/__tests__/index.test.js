import React from 'react';
import { shallow } from 'enzyme';

import { statelessActivityTitleProps as props } from 'playpants/testUtils/eventProps';

import { DuplicateBase } from '../index';

describe('Duplicate', () => {
  const wrapper = shallow(<DuplicateBase {...props} dupActivity={jest.fn()} />);
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
