import React from 'react';
import { shallow } from 'enzyme';

import TextInput from '../index';

describe('Expy - Test Graduation - TextInput', () => {
  it('renders snapshot', () => {
    const props = {
      onSave: () => {},
      value: 'value',
    };
    expect(shallow(<TextInput {...props} />)).toMatchSnapshot();
  });
});
