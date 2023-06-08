import React from 'react';
import { shallow } from 'enzyme';

import Component from '../index';

describe('Input', () => {
  it('renders default values', () => {
    const props = {
      meta: {
        touched: undefined,
        error: undefined,
      },
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const props = {
      label: 'blah',
      meta: {
        touched: true,
        error: 'invalid',
      },
      type: 'number',
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });
});
