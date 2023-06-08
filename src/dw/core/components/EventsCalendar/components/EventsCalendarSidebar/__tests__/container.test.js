import React from 'react';
import { shallow } from 'enzyme';
import createStore from 'dw/core/helpers/__tests__';
import { Provider } from 'react-redux';
import { eventCalendarTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import { EventsCalendarSidebar } from '../container';

describe('EventsCalendarSidebar', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <EventsCalendarSidebar {...props} />
      </Provider>
    );
  });

  it('renders default EventsCalendarSidebar with no choices selected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
