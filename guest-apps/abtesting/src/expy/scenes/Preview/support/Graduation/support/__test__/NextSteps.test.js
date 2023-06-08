import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';
import { shallow } from 'enzyme';

import NextSteps from '../NextSteps';

describe('Expy - Test Graduation - NextSteps', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <NextSteps />
      </Provider>
    );
  });
  it('renders snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
