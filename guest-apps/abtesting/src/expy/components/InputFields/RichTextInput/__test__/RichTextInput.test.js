import React from 'react';
import { shallow } from 'enzyme';

import RichTextInput from '../index';

describe('Expy - Test Graduation - RichTextInput', () => {
  it('renders snapshot', () => {
    const props = {
      onSave: () => {},
      value: 'value',
    };
    expect(shallow(<RichTextInput {...props} />)).toMatchSnapshot();
  });
});
