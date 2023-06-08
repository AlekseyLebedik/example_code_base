import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import createStore from 'playpants/store';
import { conflictActivityDetailsProps as props } from 'playpants/testUtils/eventProps';

import { ConflictActivityDetails } from '../index';

const { store } = createStore();

describe('ConflictActivityDetails', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <ConflictActivityDetails {...props} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
