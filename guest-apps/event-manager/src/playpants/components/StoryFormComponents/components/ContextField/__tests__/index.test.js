import React from 'react';
import { shallow } from 'enzyme';

import { contextFieldProps } from 'playpants/testUtils/components/storyFormComponentsProps';

import ContextField from '../index';

describe('ContextField', () => {
  const root = shallow(<ContextField {...contextFieldProps} />);
  it('renders the ContextField correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
