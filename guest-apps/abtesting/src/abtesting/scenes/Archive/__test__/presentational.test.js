import React from 'react';
import { shallow } from 'enzyme';

import Archive from '../presentational';

describe('abtesting/scenes/Archive', () => {
  const props = {
    archivedTests: [
      {
        id: 1,
        test_name: 'Test 1',
        title: 'Title test 1',
        platform: 'PS4',
        environment: 'Dev',
        source: 'Treyach',
        target: 'Marketplace',
        category: 'Other',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'archived',
      },
      {
        id: 3,
        test_name: 'Test 3',
        title: 'Title test 3',
        platform: 'PS4',
        environment: 'Cert',
        source: 'Treyach',
        target: 'Marketplace',
        category: 'Category1',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'archived',
      },
    ],
    formatDateTime: jest.fn(),
  };
  it('displays default component', () => {
    expect(shallow(<Archive {...props} />)).toMatchSnapshot();
  });
});
