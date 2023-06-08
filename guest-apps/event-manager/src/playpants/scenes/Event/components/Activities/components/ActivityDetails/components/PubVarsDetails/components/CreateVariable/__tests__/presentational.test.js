import React from 'react';
import { mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

import mockState from 'playpants/testUtils/mockState';
import { statelessCreateVariableProps as props } from 'playpants/testUtils/eventProps';

import CreateVariablePresentational from '../presentational';

describe('CreateVariablePresentational', () => {
  const mockStore = configureMockStore();
  const initialState = mockState;
  let store;
  let wrapper;
  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = mount(<CreateVariablePresentational {...props} store={store} />);
  });

  it('renders the CreateVariable presentational correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
