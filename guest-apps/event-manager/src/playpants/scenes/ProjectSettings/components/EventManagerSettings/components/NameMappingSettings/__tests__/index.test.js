import React from 'react';
import { mount } from 'enzyme';
import { activitiesSettingsProps as props } from 'playpants/testUtils/projectSettingsProps';

import { NameMappingSettingsBase } from '../index';

describe('NameMappingSettings', () => {
  const wrapper = mount(<NameMappingSettingsBase {...props} />);

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
