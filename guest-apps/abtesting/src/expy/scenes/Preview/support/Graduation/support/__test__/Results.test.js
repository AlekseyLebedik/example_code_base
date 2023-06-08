import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';
import { shallow } from 'enzyme';

import Results from '../Results';

describe('Expy - Test Graduation - Results', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <Results />
      </Provider>
    );
  });
  it('renders snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
