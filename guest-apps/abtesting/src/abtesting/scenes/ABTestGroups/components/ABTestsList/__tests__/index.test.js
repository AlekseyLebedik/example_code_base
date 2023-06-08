import React from 'react';
import { shallow } from 'enzyme';

import ABTestsList from '../index';

const mockItems = [
  {
    name: 'My Deals ABR Bundle',
    dateFrom: ['1571734691'],
    dateTo: ['1572515891'],
    environment: 'dev',
    cohort: 'ABR-Direct-Weapon',
    platform: 'PS3',
    status: 'config',
    target: ['t8'],
    title: 'GTR-PS3',
    config: [
      {
        configs: {
          name: 'cfg',
          configID: '16404592608665160490',
          serviceID: 't8',
          modifiers: '{}',
        },
        key: 0,
      },
    ],
  },
];

const mockDateFormat = () => 'MMM DD, YYYY';

describe('ABTestsList table', () => {
  it('renders custom values', () => {
    const props = {
      items: mockItems,
      formatDateTime: mockDateFormat,
      getRowHeight: jest.fn(),
      onFilterChange: jest.fn(),
      onFirstDataRendered: jest.fn(),
      onGridReady: jest.fn(),
    };
    expect(shallow(<ABTestsList {...props} />)).toMatchSnapshot();
  });
});
