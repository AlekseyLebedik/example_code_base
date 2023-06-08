import React from 'react';
import { shallow } from 'enzyme';

import TestList from '../index';

const mockTests = [
  {
    id: 1,
    test_name: 'Test 1',
    title: 'Title test 1',
    platform: 'PS4',
    environment: 'Dev',
    source: 'Treyach',
    target: 'Marketplace',
    category: 'Category1, Category2',
    test_period_from: 1535454075,
    test_period_to: 1535455075,
    status: 'config',
  },
  {
    id: 2,
    test_name: 'Test 2',
    title: 'Title test 2',
    platform: 'PC',
    environment: 'Dev',
    source: 'Treyach',
    target: 'Marketplace',
    category: 'Category3, Category4',
    test_period_from: 1535454075,
    test_period_to: 1535455075,
    status: 'approved',
  },
];

describe('TestList', () => {
  it('renders stardard user case', () => {
    const props = {
      title: 'mock',
      tests: mockTests,
    };
    expect(shallow(<TestList {...props} />)).toMatchSnapshot();
  });

  it('renders circular progress', () => {
    const props = {
      title: 'mock',
      tests: [],
    };
    expect(shallow(<TestList {...props} />)).toMatchSnapshot();
  });
});
