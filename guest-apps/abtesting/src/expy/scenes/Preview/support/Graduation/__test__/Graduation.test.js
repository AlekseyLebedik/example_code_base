import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';
import { shallow } from 'enzyme';

import Graduation from '../index';

describe('Expy - Test Graduation - Graduation', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Graduation />
      </Provider>
    );
  });
  it('renders snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
