import React from 'react';
import { shallow } from 'enzyme';

import SelectInput from '../index';

describe('Expy - Test Graduation - SelectInput', () => {
  it('renders snapshot', () => {
    const props = {
      onSave: () => {},
      value: 'value',
      label: 'testing',
      options: [{ field: 'name', value: 'value' }],
    };
    expect(shallow(<SelectInput {...props} />)).toMatchSnapshot();
  });
});
