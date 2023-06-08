import React from 'react';
import { mount } from 'enzyme';
import { globalSettingsProps as props } from 'playpants/testUtils/projectSettingsProps';

import { GlobalSettingsBase } from '../index';

describe('GlobalSettings', () => {
  const wrapper = mount(<GlobalSettingsBase {...props} />);

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
