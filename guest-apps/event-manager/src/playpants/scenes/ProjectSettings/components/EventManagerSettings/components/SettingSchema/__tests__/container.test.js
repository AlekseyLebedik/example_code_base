import React from 'react';
import { mount } from 'enzyme';
import { settingSchema as props } from 'playpants/testUtils/projectSettingsProps';

import { SettingSchema } from '../container';

describe('SettingSchema', () => {
  const wrapper = mount(<SettingSchema {...props} />);
  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
