import React from 'react';
import { shallow } from 'enzyme';
import { descriptionFieldProps } from 'playpants/testUtils/components/storyFormComponentsProps';
import DescriptionField from '../index';

describe('DescriptionField', () => {
  const root = shallow(<DescriptionField {...descriptionFieldProps} />);
  it('renders the DescriptionField correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
