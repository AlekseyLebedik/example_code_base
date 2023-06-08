import React from 'react';
import { shallow } from 'enzyme';

import TitleInfoTable from '../gridPresentational';

const mock = [
  {
    group: 'Services',
    name: 'AE',
    value: '23.48.2',
  },
  {
    group: 'Services',
    name: 'Auth',
    value: 'autn3',
  },
];

describe('Title Info Table', () => {
  it('renders custom values', () => {
    const props = {
      titleInfo: mock,
      onGridReady: jest.fn(),
      onFilterChange: jest.fn(),
    };
    expect(shallow(<TitleInfoTable {...props} />)).toMatchSnapshot();
  });
});
