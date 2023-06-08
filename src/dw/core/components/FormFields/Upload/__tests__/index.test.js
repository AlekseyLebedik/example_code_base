import React from 'react';
import { shallow } from 'enzyme';

import Component from '../index';

describe('UploadField', () => {
  it('renders default values', () => {
    const props = {
      input: {
        value: { file: undefined },
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
        value: { file: 'YmxhaA==' },
        onChange: jest.fn(),
      },
      meta: {
        touched: true,
        error: 'invalid',
      },
      label: 'Blah',
      name: 'fileData',
      fullWidth: true,
    };
    expect(shallow(<Component {...props} />)).toMatchSnapshot();
  });
});
