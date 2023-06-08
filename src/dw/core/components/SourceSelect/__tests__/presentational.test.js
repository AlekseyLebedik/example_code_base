import React from 'react';
import { shallow } from 'enzyme';

import SourceSelectStateless from '../presentational';

describe('SourceSelectStateless', () => {
  it('renders default values', () => {
    const props = {
      data: [],
      renderOption: jest.fn(),
      onType: jest.fn(),
      onSelect: jest.fn(),
      onFocus: jest.fn(),
      onChange: jest.fn(),
    };
    expect(shallow(<SourceSelectStateless {...props} />)).toMatchSnapshot();
  });

  it('renders dataSource as "userName | userID"', () => {
    const props = {
      data: [{ userName: 'rockstar_user', userID: '1234567890' }],
      renderOption: item => `${item.userName} | ${item.userID}`,
      onType: jest.fn(),
      onSelect: jest.fn(),
      onFocus: jest.fn(),
      onChange: jest.fn(),
    };
    expect(shallow(<SourceSelectStateless {...props} />)).toMatchSnapshot();
  });

  it('renders with custom placeholder', () => {
    const props = {
      data: [],
      renderOption: jest.fn(),
      onType: jest.fn(),
      onSelect: jest.fn(),
      withoutPrefix: true,
      placeholder: 'Custom Placeholder',
      onFocus: jest.fn(),
      onChange: jest.fn(),
    };
    expect(shallow(<SourceSelectStateless {...props} />)).toMatchSnapshot();
  });
});
