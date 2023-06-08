import React from 'react';
import { mount } from 'enzyme';
import { notificationSettingsProps as props } from 'playpants/testUtils/projectSettingsProps';

import { NotificationSettingsBase } from '../index';

describe('NotificationSettingsBase', () => {
  const wrapper = mount(<NotificationSettingsBase {...props} />);

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
