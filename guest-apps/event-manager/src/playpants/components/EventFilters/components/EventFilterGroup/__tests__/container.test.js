import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import createStore from 'dw/core/helpers/__tests__';

import { eventFilterGroupProps } from 'dw/core/components/EventsCalendar/testData';

import EventFilterGroup from '../container';

describe('EventFilterGroup', () => {
  const { store } = createStore();

  const getWrapper = (props = {}) =>
    shallow(
      <Provider store={store}>
        <EventFilterGroup {...eventFilterGroupProps} {...props} />
      </Provider>
    );

  it('renders default EventFilterGroup empty', () => {
    const wrapper = getWrapper();
    expect(wrapper).toMatchSnapshot();
  });
});
