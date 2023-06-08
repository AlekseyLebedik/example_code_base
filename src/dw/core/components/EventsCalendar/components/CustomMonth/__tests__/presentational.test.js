import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import { dateToUTCTimestamp } from 'dw/core/helpers/date-time';
import {
  customMonthTestProps as props,
  mockState,
} from 'dw/core/components/EventsCalendar/testData';

import CustomMonthStateless from '../presentational';

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

moment.tz.setDefault('UTC');

describe('CustomMonthStateless', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CustomMonthStateless {...props} />);
  });

  it('renders correctly with 30 days', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with 10 days', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        customViewOn: true,
        numberOfDays: 10,
        selectedDay: moment(new Date(2019, 0, 1)).tz('UTC'),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with 60 days', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        customViewOn: true,
        numberOfDays: 10,
        selectedDay: moment(new Date(2019, 0, 1)).tz('UTC'),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with 100 days', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        customViewOn: true,
        numberOfDays: 10,
        selectedDay: moment(new Date(2019, 0, 1)).tz('UTC'),
      },
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with popup', () => {
    wrapper.setProps({
      popupEvents: [
        {
          created_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
          end: moment('2019-01-01T00:00:00Z').toDate(),
          publish_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
          start: moment('2019-01-01T00:00:00Z').toDate(),
          status: 'pending',
          title: 'Test 1',
        },
        {
          created_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
          end: moment('2019-01-01T00:00:00Z').toDate(),
          publish_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
          start: moment('2019-01-01T00:00:00Z').toDate(),
          status: 'approved',
          title: 'Test 2',
        },
        {
          created_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
          end: moment('2019-01-01T00:00:00Z').toDate(),
          publish_at: dateToUTCTimestamp(new Date(2019, 0, 1)),
          start: moment('2019-01-01T00:00:00Z').toDate(),
          status: 'pending',
          title: 'Test 3',
        },
      ],
    });

    expect(wrapper).toMatchSnapshot();
  });
});
