import React from 'react';
import { shallow } from 'enzyme';

import KeyValue from '../index';

describe('KeyValue', () => {
  it('renders default values', () => {
    const props = {
      item: { key1: '1', key2: '2', key3: '3' },
      size: 8,
    };
    expect(shallow(<KeyValue {...props} />)).toMatchSnapshot();
  });

  it('renders ordered values', () => {
    const props = {
      item: { key1: '1', key2: '2', key3: '3' },
      size: 8,
      elementsOrder: ['key2', 'key1', 'key3'],
    };
    expect(shallow(<KeyValue {...props} />)).toMatchSnapshot();
  });

  it('renders custom formatted values', () => {
    const props = {
      item: {
        key1: 1233456789, // Expected Feb 01, 2009 04:53 am
        key2: '1', // Expexted 'Yes'
        key3: '3',
      },
      size: 8,
      customFormats: { key1: 'datetime', key2: 'boolean' },
    };
    expect(shallow(<KeyValue {...props} />)).toMatchSnapshot();
  });

  it('renders ordered formatted values', () => {
    const props = {
      item: {
        key1: '1',
        key2: '2',
        key3: '3', // Expected '3 bytes'
      },
      size: 8,
      elementsOrder: [
        'key2',
        'key1',
        {
          key: 'key3',
          name: 'Size',
          formatter: key3 => `${key3} bytes`,
        },
      ],
    };
    expect(shallow(<KeyValue {...props} />)).toMatchSnapshot();
  });
});
