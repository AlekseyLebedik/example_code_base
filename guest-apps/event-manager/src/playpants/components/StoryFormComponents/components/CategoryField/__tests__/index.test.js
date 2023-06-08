import React from 'react';
import { shallow } from 'enzyme';

import { CategoryFieldProps } from 'playpants/testUtils/components/storyFormComponentsProps';

import CategoryField from '../index';

describe('CategoryField', () => {
  const root = shallow(<CategoryField {...CategoryFieldProps} />);
  it('renders the CategoryField correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
