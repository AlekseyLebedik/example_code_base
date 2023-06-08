import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';
import { shallow } from 'enzyme';

import StepsDetail from '../StepsDetail';

describe('Expy - Test Graduation - StepsDetail', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <StepsDetail />
      </Provider>
    );
  });
  it('renders section snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
