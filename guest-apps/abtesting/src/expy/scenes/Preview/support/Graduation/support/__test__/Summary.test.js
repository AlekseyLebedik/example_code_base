import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';
import { shallow } from 'enzyme';

import Summary from '../Summary';

describe('Expy - Test Graduation - Summary', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Summary />
      </Provider>
    );
  });
  it('renders snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
