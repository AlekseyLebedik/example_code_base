import React from 'react';
import { shallow } from 'enzyme';

import Form from '../index';

describe('Expy - Test Graduation - Form', () => {
  it('renders snapshot', () => {
    const props = {
      handleSubmit: () => {},
      handleChange: () => {},
      values: {},
      touched: {},
      handleBlur: () => {},
      errors: {},
      isSubmitting: false,
      isValid: true,
      onCancel: () => {},
    };
    expect(shallow(<Form {...props} />)).toMatchSnapshot();
  });
});
