import React from 'react';
import { shallow } from 'enzyme';

import LinkInput from '../index';

describe('Expy - Test Graduation - LinkInput', () => {
  it('renders snapshot', () => {
    const props = {
      onSave: () => {},
      onCancel: () => {},
      error: true,
      errorMsg: 'message',
    };
    expect(shallow(<LinkInput {...props} />)).toMatchSnapshot();
  });
});
