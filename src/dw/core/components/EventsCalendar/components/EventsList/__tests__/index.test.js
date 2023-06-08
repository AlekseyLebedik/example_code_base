import React from 'react';
import { shallow } from 'enzyme';

import {
  eventCalendarChildrenTestProps as props,
  mockState,
} from 'dw/core/components/EventsCalendar/testData';

import EventsList from '../index';

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

describe('EventsList', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventsList {...props} />);
  });

  it('renders default EventsList with no events', () => {
    wrapper.setProps({
      events: [],
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default EventsCalendarSidebar with events', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
