import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';
import Schedule from '../presentational';

describe('abtesting/scenes/Schedule', () => {
  const props = {
    upcomingTests: [
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
        status: 'config',
      },
    ],
    liveTests: [
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
        status: 'active',
      },
    ],
    recentlyFinishedTests: [
      {
        id: 6,
        test_name: 'Test 6',
        title: 'Title test 6',
        platform: 'PS4',
        environment: 'Cert',
        source: 'Treyach',
        target: 'Marketplace',
        category: 'Category3',
        test_period_from: 1535454075,
        test_period_to: 1535455075,
        status: 'analysis',
      },
    ],
    history: {},
    availableContexts: ['1:dev'],
    formatDateTime: jest.fn(),
  };
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Schedule {...props} />
      </Provider>
    );
  });
  it('displays default component', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
