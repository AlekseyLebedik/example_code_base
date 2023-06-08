import React from 'react';
import { shallow } from 'enzyme';
import createStore from 'playpants/store';
import { Provider } from 'react-redux';
import { Schedule } from '../index';

describe('Schedule', () => {
  const { store } = createStore();
  const root = shallow(
    <Provider store={store}>
      <Schedule />
    </Provider>
  );
  it('renders default properly', () => {
    expect(root).toMatchSnapshot();
  });
});
