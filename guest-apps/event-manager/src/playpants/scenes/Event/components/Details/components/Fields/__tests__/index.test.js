import React from 'react';
import { shallow } from 'enzyme';

import { eventFieldsProps as props } from 'playpants/testUtils/eventProps';

import { FieldsBase } from '../index';

describe('Fields', () => {
  const wrapper = shallow(<FieldsBase {...props} />);

  it('renders the Fields component correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
