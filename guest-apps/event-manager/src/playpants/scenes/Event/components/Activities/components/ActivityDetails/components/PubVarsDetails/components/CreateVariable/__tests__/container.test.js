import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import mockState from 'playpants/testUtils/mockState';

import { namespaceProps as props } from 'playpants/testUtils/eventProps';

import CreateVariable from '../container';

describe('CreateActivityFormBase', () => {
  const mockStore = configureMockStore();
  const initialState = mockState;
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<CreateVariable {...props} store={store} />);
  });

  it('renders the CreateVariable container correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
