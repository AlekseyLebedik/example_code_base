import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';
import { shallow } from 'enzyme';

import WebLinks from '../WebLinks';

describe('Expy - Test Graduation - Web Links', () => {
  const { store } = createStore();
  const props = {
    isLinkInput: false,
    setIsLinkInput: () => {},
  };
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <WebLinks {...props} />
      </Provider>
    );
  });
  it('renders section snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
