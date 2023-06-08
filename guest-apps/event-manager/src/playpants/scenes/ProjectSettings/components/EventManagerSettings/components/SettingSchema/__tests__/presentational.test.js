import React from 'react';
import { shallow } from 'enzyme';
import { statelessSettingSchemaProps as props } from 'playpants/testUtils/projectSettingsProps';

import StatelessSettingSchema from '../presentational';

describe('StatelessSettingSchema', () => {
  const wrapper = shallow(<StatelessSettingSchema {...props} />);

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should always render a form', () => {
    expect(wrapper.find('Form')).toMatchSnapshot();
  });
});
