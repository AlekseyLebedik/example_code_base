import React from 'react';
import { shallow } from 'enzyme';

import Component from '../index';

describe('Select', () => {
  it('renders default values', () => {
    const props = {
      input: {
        value: null,
      },
      meta: {
        touched: undefined,
        error: undefined,
      },
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const props = {
      input: {
        value: 'item1',
        onChange: jest.fn(),
      },
      items: jest.fn(),
      meta: {
        touched: true,
        error: 'invalid',
      },
      label: 'Blah',
      fullWidth: true,
      multiple: true,
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });
});
