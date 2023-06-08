import React from 'react';
import { mount } from 'enzyme';
import { activitiesSettingsProps as props } from 'playpants/testUtils/projectSettingsProps';

import { ActivitiesSettingsBase } from '../index';

describe('ActivitiesSettings', () => {
  const wrapper = mount(<ActivitiesSettingsBase {...props} />);

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
