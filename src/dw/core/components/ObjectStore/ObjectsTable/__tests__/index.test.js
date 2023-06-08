import React from 'react';
import { shallow } from 'enzyme';

import ObjectTable from '../index';

const mockObjects = [
  {
    category: null,
    name: 'name_test',
    expiresOn: 0,
    checksum: 'checksum_test',
    contentLength: 123456,
    alc: 'ALC_test',
    extraData: null,
  },
];

const mockDateFormat = () => 'MMM DD, YYYY';

describe('Confirm', () => {
  it('renders default values', () => {
    const props = {
      objects: [],
      onDownload: jest.fn(),
      hasDeletePermission: false,
      formatDateTime: mockDateFormat,
      promotePubGroups: jest.fn(),
      onLoadData: jest.fn(),
    };
    expect(shallow(<ObjectTable {...props} />)).toMatchSnapshot();
  });

  it('renders custom values', () => {
    const props = {
      objects: mockObjects,
      onDownload: jest.fn(),
      hasDeletePermission: false,
      formatDateTime: mockDateFormat,
      promotePubGroups: jest.fn(),
      onLoadData: jest.fn(),
    };
    expect(shallow(<ObjectTable {...props} />)).toMatchSnapshot();
  });

  it('render with delete permissions', () => {
    const props = {
      objects: mockObjects,
      onDownload: jest.fn(),
      hasDeletePermission: true,
      formatDateTime: mockDateFormat,
      promotePubGroups: jest.fn(),
      onLoadData: jest.fn(),
    };
    expect(shallow(<ObjectTable {...props} />)).toMatchSnapshot();
  });
});
