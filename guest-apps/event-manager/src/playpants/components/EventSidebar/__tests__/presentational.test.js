import React from 'react';
import { shallow } from 'enzyme';

import {
  eventCalendarTestProps as props,
  mockState,
} from 'dw/core/components/EventsCalendar/testData';

import EventsSidebar from '../presentational';

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

describe('EventsSidebar', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventsSidebar {...props} />);
  });

  it('renders default EventsSidebar with no choices selected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders EventsSidebar with no onSelectSlot function', () => {
    wrapper.setProps({
      onSelectSlot: () => {},
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default EventsSidebar with event tags', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        ...props.eventsCalendarSettings,
        eventTags: ['PS4', 'XBOX1'],
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
