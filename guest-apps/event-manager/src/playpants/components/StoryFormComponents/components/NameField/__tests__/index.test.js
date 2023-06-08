import React from 'react';
import { shallow } from 'enzyme';
import { nameFieldProps } from 'playpants/testUtils/components/storyFormComponentsProps';
import NameField from '../index';

describe('NameField', () => {
  const root = shallow(<NameField {...nameFieldProps} />);
  it('renders the NameField correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
