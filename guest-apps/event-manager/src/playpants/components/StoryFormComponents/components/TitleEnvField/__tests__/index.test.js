import React from 'react';
import { shallow } from 'enzyme';
import { titleEnvFieldProps } from 'playpants/testUtils/components/storyFormComponentsProps';
import TitleEnvField from '../index';

describe('TitleEnvField', () => {
  const root = shallow(<TitleEnvField {...titleEnvFieldProps} />);
  it('renders the TitleEnvField correctly', () => {
    expect(root).toMatchSnapshot();
  });
});
