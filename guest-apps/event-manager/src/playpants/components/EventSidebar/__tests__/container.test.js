import React from 'react';
import { shallow } from 'enzyme';
import createStore from 'dw/core/helpers/__tests__';
import { Provider } from 'react-redux';
import { eventCalendarTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import { EventsSidebar } from '../container';

describe('EventsSidebar', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <EventsSidebar {...props} />
      </Provider>
    );
  });

  it('renders default EventsSidebar with no choices selected', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
