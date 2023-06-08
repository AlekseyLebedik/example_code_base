import React from 'react';
import { shallow } from 'enzyme';

import {
  eventCalendarTestProps as props,
  mockState,
} from 'dw/core/components/EventsCalendar/testData';

import EventsCalendarSidebar from '../presentational';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: selector => selector(mockState),
  connect: stateToProps => Component => componentProps =>
    (
      <Component
        {...componentProps}
        {...stateToProps(mockState, componentProps)}
      />
    ),
}));

describe('EventsCalendarSidebar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventsCalendarSidebar {...props} />);
  });

  it('renders default EventsCalendarSidebar with no choices selected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders EventsCalendarSidebar with no onSelectSlot function', () => {
    wrapper.setProps({
      onSelectSlot: () => {},
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default EventsCalendarSidebar with event tags', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...props.eventsCalendarSettings,
        eventTags: ['PS4', 'XBOX1'],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
