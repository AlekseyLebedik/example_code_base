import React from 'react';
import { Provider } from 'react-redux';
import createStore from 'dw/core/helpers/__tests__';
import { shallow } from 'enzyme';

import DownloadBtn from '../support/DownloadBtn';

describe('Expy - Test Graduation - DownloadBtn', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    const props = {
      url: 'http://hello.com',
      title: 'Hello',
    };
    wrapper = shallow(
      <Provider store={store}>
        <DownloadBtn {...props} />
      </Provider>
    );
  });
  it('renders snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
