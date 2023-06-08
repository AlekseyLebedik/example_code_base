import React from 'react';
import { shallow } from 'enzyme';
import createStore from 'dw/core/helpers/__tests__';
import { Provider } from 'react-redux';

import { eventCalendarTestProps as props } from 'dw/core/components/EventsCalendar/testData';
import { EventsCalendar } from '../container';

describe('EventsCalendar', () => {
  const { store } = createStore();
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Provider store={store}>
        <EventsCalendar {...props} />
      </Provider>
    );
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
