import React from 'react';
import { shallow } from 'enzyme';

import Component from '../index';

describe('Checkbox', () => {
  it('renders default values', () => {
    const props = {
      input: {
        value: false,
      },
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const props = {
      input: {
        value: true,
        onChange: jest.fn(),
      },
      label: 'blah',
      labelStyle: { color: '#fff' },
      style: { padding: '0 8px' },
      className: 'main-checkbox',
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });
});
