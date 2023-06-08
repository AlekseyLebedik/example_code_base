import React from 'react';

import { shallow } from 'enzyme';
import createStore from 'dw/online-configuration/store';

import AGGridKeyValueField from '..';

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
  };
});

const { useSelector: mockUseSelector } = require('react-redux');

const setupStore = () => {
  const { store: mockStore } = createStore();
  mockStore.dispatch({
    type: 'TITLE_SELECTOR.CHANGE_TITLE',
    environment: { id: 1 },
  });
  mockStore.dispatch({
    type: 'core/UPDATE_USER_REPLICA',
    data: {
      projects: [{ titles: [{ environments: [{ id: 1 }] }] }],
    },
  });
  mockUseSelector.mockImplementation(selector =>
    selector(mockStore.getState())
  );
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation() {
    return { search: 'query=value1' };
  },
}));

describe('AGGridKeyValueField', () => {
  beforeEach(() => setupStore());
  it('render', () => {
    const wrapper = shallow(
      <AGGridKeyValueField
        input={{ value: [{ key: 'key1', value: 'value1' }] }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
