import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment-timezone';

import { eventCalendarChildrenTestProps as props } from 'dw/core/components/EventsCalendar/testData';

import { CustomWeek } from '../index';

moment.tz.setDefault('UTC');
const selectedDay = moment('2019-01-01T00:00:00Z').tz('UTC');

describe('CustomWeek', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <CustomWeek
        {...props}
        max={moment('2019-01-01T23:59:59Z').toDate()}
        min={selectedDay.toDate()}
        scrollToTime={selectedDay.toDate()}
      />
    );
  });

  it('renders default values', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 1 day custom view', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        customViewOn: true,
        numberOfDays: 1,
        selectedDay,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 5 day custom view', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        customViewOn: true,
        numberOfDays: 5,
        selectedDay,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 9 day custom view', () => {
    wrapper.setProps({
      eventsCalendarSettings: {
        customViewOn: true,
        numberOfDays: 9,
        selectedDay,
      },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
